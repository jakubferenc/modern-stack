export interface BasicServerResponse {
  code: number;
  success: boolean;
  message: string;
}

export interface AuthResponse extends BasicServerResponse {
  token: string | null;
}
export interface ServerResponse extends AuthResponse {
  user?: object | null;
  job?: object | null;
}
