import {
  getJobs,
  getJob,
  addJob,
  registerUser,
  getUsers,
  getUser,
} from './db/index.ts';

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
