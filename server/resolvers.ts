import { getJobs, getJob, addJob } from './db/index.ts';

// Resolve the GraphQL queries
export const resolvers = {
  Query: {
    greeting: () => 'Hello GraphQL World!',
    jobs: async () => {
      const jobs = await getJobs();
      console.log(jobs);
      return jobs?.map((job) => {
        return {
          ...job,
          date: new Date(job.created_at).toLocaleString('cs-CZ'),
        }
      });
    },
    job: async (_root: object, args: { id: string }) => {
      const job = await getJob(args.id);
      return {
        code: 200,
        success: true,
        message: 'Job fetched successfully',
        job,
      }
    },
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
