import { getJobs, addJob } from './db/index.ts';

// Resolve the GraphQL queries
export const resolvers = {
  Query: {
    greeting: () => 'Hello GraphQL World!',
    jobs: async () => {
      const jobs = await getJobs();
      return jobs?.map((job) => {
        return {
          ...job,
        };
      });
    },
  },
  Job: {
    date: (job) => new Date(job.created_at).toLocaleString('cs-CZ'),
  },
  Mutation: {
    registerUser: async (_: object, args: { newValues: object }) => {
      const user = await registerUser(args.newValues);

      return {
        code: 200,
        success: true,
        message: 'User registered successfully',
        user,
      };
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
