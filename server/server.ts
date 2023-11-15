import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
// import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.ts';

const ROOT_DIR = process.cwd();
const PORT = 9000;

const typeDefs = await readFile(`${ROOT_DIR}/schema.graphql`, 'utf8');

const app = express();
app.use(cors(), express.json());

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer));

app.get('/login', (_, res) => { 
  res.send('Hello from Login!');
});

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
