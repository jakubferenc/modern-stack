import config from '../../config/index';
import { AuthRequest } from '../models/auth';

export async function authenticateWithCredentials(formData: AuthRequest) {
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

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
