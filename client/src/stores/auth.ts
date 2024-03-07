import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Token } from '../models/auth';
import { authenticateWithCredentials } from '../services/authService';
import { AuthRequest, AuthJWTResponse } from '../models/auth';
import config from '../../config';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<Token>(null);
  const isAuthenticated = computed(() => token.value && token.value !== null);
  async function authenticate(payload: AuthRequest): Promise<Token> {
    const authJWTResponse = (await authenticateWithCredentials(
      payload,
    )) as AuthJWTResponse;
    if (authJWTResponse.token) {
      _setToken(authJWTResponse.token);
      return authJWTResponse.token;
    } else {
      throw new Error('Invalid token');
    }
  }
  function logout() {
    _removeToken();
  }

  function getToken() {
    return token.value || localStorage.getItem(config.ACCESS_TOKEN_KEY);
  }

  function _setToken(newToken: Token) {
    token.value = newToken;
    localStorage.setItem(config.ACCESS_TOKEN_KEY, newToken?.toString() || '');
  }

  function _removeToken() {
    token.value = null;
    localStorage.removeItem(config.ACCESS_TOKEN_KEY);
  }

  return { token, isAuthenticated, authenticate, logout, getToken };
});
