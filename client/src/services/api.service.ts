import tokenService from './token.service';
import config from '@@/config';

class ApiService {
  async get(path: string, auth = true) {
    const token = tokenService.getToken();

    const headers: HeadersInit = {};

    if (auth && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const request = await fetch(`${config.API_URL}${path}`, {
      headers,
    });

    return request.json();
  }
  async post(path: string, data: object, auth = true) {
    const token = tokenService.getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (auth && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const request = await fetch(`${config.API_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    return request.json();
  }
}

// singleton api service
const apiService = new ApiService();
export default apiService;
