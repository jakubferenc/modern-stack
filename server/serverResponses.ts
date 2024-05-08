export interface BasicServerResponse {
  code: number;
  message: string;
}

export interface AuthResponse extends BasicServerResponse {
  token: string | null;
}
export interface ServerResponse extends BasicServerResponse {
  user?: object | null;
  job?: object | null;
}
