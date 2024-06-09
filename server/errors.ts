import { GraphQLError } from 'graphql';

export const GraphQLAuthenticationError = (msg) => {
  return new GraphQLError(msg, {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  });
};
