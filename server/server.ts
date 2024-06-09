import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import resolvers from './resolvers.ts';

import { getUserByEmail } from './db/index.ts';
import { checkPasswordMatch, getJwtTokenFromHeader } from './helpers.ts';
import { GqlContext } from './types.ts';
import jwt from 'jsonwebtoken';

(async () => {
  const ROOT_DIR = process.cwd();
  const PORT = 9000;

  const typeDefs = await readFile(`${ROOT_DIR}/schema.graphql`, 'utf8');

  const app = express();
  app.use(cors(), express.json());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const getGqlContext = async ({ req }): Promise<GqlContext> => {
    return {
      headers: req.headers,
    };
  };

  await apolloServer.start();

  app.use(
    '/graphql',
    apolloMiddleware(apolloServer, {
      context: getGqlContext,
    }),
  );

  app.post('/login', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
      // check if user exists and password is correct
      const user = await getUserByEmail(req.body.username);
      const passwordMatch = checkPasswordMatch(
        user.password,
        req.body.password,
      );

      if (!user) {
        res.status(401).send({
          code: 401,
          message: 'User not found',
          token: null,
        });
        return;
      }

      if (!passwordMatch) {
        res.status(401).send({
          code: 401,
          success: false,
          message: 'Password is incorrect',
          token: null,
        });
        return;
      }

      // generate token
      const token = jwt.sign(
        {
          data: { username: req.body.username },
        },
        process.env.SERVER_SECRET as string,
        { expiresIn: '1h' },
      );

      res.status(200).send({
        code: 200,
        success: true,
        message: 'User authenticated successfully',
        token,
      });
      return;
    } catch (err: unknown) {
      res.status(500).send({
        code: 500,
        success: false,
        message: `Server error while authenticating user: ${err}`,
        token: null,
      });
      return;
    }
  });

  app.get('/protected', (req, res) => {
    if (!req.headers?.authorization) {
      res.status(401).send({
        code: 401,
        message: 'No token provided',
      });
      return;
    }
    const token = getJwtTokenFromHeader(req.headers.authorization);

    if (!token) {
      res.status(401).send({
        code: 401,
        message: 'No token provided',
      });
    }

    jwt.verify(
      token as string,
      process.env.SERVER_SECRET as string,
      (err, decoded) => {
        if (err) {
          res.status(401).send({
            code: 401,
            message: 'Failed to authenticate token',
          });
          return;
        }

        res.status(200).send({
          code: 200,
          message: 'Token authenticated successfully',
          data: decoded,
        });
      },
    );
  });

  app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
