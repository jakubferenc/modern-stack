import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import resolvers from './resolvers.ts';

import { getUserByEmail } from './db/index.ts';
import { checkPasswordMatch } from './helpers.ts';
import jwt from 'jsonwebtoken';

(async () => {
  const ROOT_DIR = process.cwd();
  const PORT = 9000;

  const serverSecret = 'mySecret';

  const typeDefs = await readFile(`${ROOT_DIR}/schema.graphql`, 'utf8');

  const app = express();
  app.use(cors(), express.json());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({ req }) => {
    //   console.log(req);
    // },
  });

  await apolloServer.start();

  app.use('/graphql', apolloMiddleware(apolloServer));

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
          success: false,
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
        serverSecret,
        { expiresIn: 60 * 60 },
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

  app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
