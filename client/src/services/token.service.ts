import config from '../../config';

export default class TokenService {
  static setToken(token) {
    localStorage.setItem(config.ACCESS_TOKEN_KEY, token);
  }

  static getToken() {
    return localStorage.getItem(config.ACCESS_TOKEN_KEY);
  }

  static removeToken() {
    localStorage.removeItem(config.ACCESS_TOKEN_KEY);
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static getRefreshToken() {
    return localStorage.getItem(config.REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token) {
    localStorage.setItem(config.REFRESH_TOKEN_KEY, token);
  }

  static removeRefreshToken() {
    localStorage.removeItem(config.REFRESH_TOKEN_KEY);
  }
}
