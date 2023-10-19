import { getJobs, getJob, addJob } from './db/index.ts';

// Resolve the GraphQL queries
export const resolvers = {
  Query: {
    greeting: () => 'Hello GraphQL World!',
    jobs: () => getJobs(),
    job: (_root: object, args: {id: string}) => getJob(args.id),
  },
  Mutation: {
    addJob: async (_: object, args: { newValues: object }) => {

      const job = await addJob(args.newValues);

      return {
        code: 200,
        success: true,
        message: 'Job added successfully',
        job,
      }
      
    },
  }
};
