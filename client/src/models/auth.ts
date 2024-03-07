import { BasicServerResponse } from './server';

export interface AuthRequest {
  username: string;
  password: string;
}
export type Token = string | null;

export interface AuthJWTResponse extends BasicServerResponse {
  token: Token;
}
