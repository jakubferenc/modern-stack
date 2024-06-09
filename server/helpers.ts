import { GraphQLAuthenticationError } from './errors.ts';
import jwt from 'jsonwebtoken';

export const checkPasswordMatch = (
  password: string,
  passwordConfirm: string,
) => {
  return (
    password.toLowerCase().toString() ===
    passwordConfirm.toLowerCase().toString()
  );
};

export const getJwtTokenFromHeader = (authHeader: string) => {
  if (!authHeader) return false;
  const headerParts = authHeader.split(' ');
  if (headerParts.length !== 2) return false;
  const [bearer, token] = headerParts;
  if (bearer.toLowerCase() !== 'bearer')
    return GraphQLAuthenticationError('Invalid token type');
  return token;
};

export const authDecorator = async (context, resolver: Function) => {
  const authHeader = context.headers?.authorization;
  if (!authHeader) {
    throw GraphQLAuthenticationError('Missing authorization header');
  }
  const token = getJwtTokenFromHeader(authHeader);
  if (!token) {
    throw GraphQLAuthenticationError('Invalid token');
  }
  let user: string | jwt.JwtPayload;
  try {
    user = jwt.verify(token as string, process.env.SERVER_SECRET as string);
  } catch (err) {
    throw GraphQLAuthenticationError('Failed to authenticate token' + err);
  }
  if (user) {
    return await resolver({ auth: user });
  }
};
