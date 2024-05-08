import config from '../../config/index';
import { AuthRequest } from '../models/auth';

class AuthService {
  async authenticateWithCredentials(formData: AuthRequest) {
    try {
      const { username, password } = formData;
      const response = await fetch(`${config.API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        } as AuthRequest),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to authenticate user: ${response.status} ${response.statusText}`,
        );
      }

      const responseData = await response.json();
      return responseData;
    } catch (error: unknown) {
      console.error(error);
      throw new Error(
        (error as Error)?.message || 'Server error while authenticating user',
      );
    }
  }
}

export default new AuthService();
