export interface ServerResponse {
  code: number;
  success: boolean;
  message: string;
  token?: string | null;
  user?: object | null;
  job?: object | null;
}
