import { ServerResponse } from 'serverResponses';
import {
  getJobs,
  getJob,
  addJob,
  registerUser,
  getUsers,
  getUser,
  getUserByEmail,
} from './db/index.ts';
import { checkPasswordMatch } from './helpers.ts';
import { sign } from 'jsonwebtoken';

// Resolve the GraphQL queries
export const resolvers = {
  Query: {
    greeting: () => 'Hello GraphQL World!',
    jobs: async () => {
      const jobs = await getJobs();
      return jobs;
    },
    users: async () => {
      const users = await getUsers();
      return users;
    },
    job: async (_: object, args: { id: string }) => {
      const job = await getJob(args.id);
      return job;
    },
    user: async (_: object, args: { id: string }) => {
      const user = await getUser(args.id);
      return user;
    },
  },
  Job: {
    date: (job) => new Date(job.created_at).toLocaleString('cs-CZ'),
  },
  User: {
    date: (user) => new Date(user.created_at).toLocaleString('cs-CZ'),
  },
  Mutation: {
    authenticateUser: async (
      _: object,
      args: { email: string; password: string },
    ): Promise<ServerResponse> => {
      try {
        // check if user exists and password is correct
        const user = await getUserByEmail(args.email);
        const passwordMatch = checkPasswordMatch(user.password, args.password);

        if (!user) {
          return {
            code: 401,
            success: false,
            message: 'User not found',
            token: null,
          };
        }

        if (!passwordMatch) {
          return {
            code: 401,
            success: false,
            message: 'Password is incorrect',
            token: null,
          };
        }

        // generate token
        const token = sign();
        return {
          code: 200,
          success: true,
          message: 'User authenticated successfully',
          token,
        };
      } catch (err: unknown) {
        return {
          code: 500,
          success: false,
          message: `Server error while authenticating user: ${err}`,
          token: null,
        };
      }
    },

    registerUser: async (_: object, args: { newValues: object }) => {
      try {
        const user = await registerUser(args.newValues);
        return {
          code: 200,
          success: true,
          message: 'User registered successfully',
          user,
        };
      } catch (err: unknown) {
        return {
          code: 500,
          success: false,
          message: `Server error while registering user: ${err}`,
          user: null,
        };
      }
    },

    addJob: async (_: object, args: { newValues: object }) => {
      const job = await addJob(args.newValues);

      return {
        code: 200,
        success: true,
        message: 'Job added successfully',
        job,
      };
    },
  },
};
export default resolvers;
