import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Token } from '../models/auth';
import { authenticateWithCredentials } from '../services/authService';
import { AuthRequest, AuthJWTResponse } from '../models/auth';
import { useToast } from 'primevue/usetoast';
import config from '../../config';

const toast = useToast();

export const useAuthStore = defineStore('auth', () => {
  const token = ref<Token>(null);
  const isAuthenticated = computed(() => token.value && token.value !== null);
  async function authenticate(payload: AuthRequest): Promise<Token> {
    const authJWTResponse = (await authenticateWithCredentials(
      payload,
    )) as AuthJWTResponse;
    if (authJWTResponse.token) {
      _setToken(authJWTResponse.token);
      _printLoginSuccessMessage();
      return authJWTResponse.token;
    } else {
      toast.add({
        severity: 'error',
        summary: 'User login',
        detail: 'User login failed',
        life: 5000,
      });
      throw new Error('Invalid token');
    }
  }
  function logout() {
    _removeToken();
    _printLogoutSuccessMessage();
  }

  function getToken() {
    return token.value || localStorage.getItem(config.ACCESS_TOKEN_KEY);
  }

  function _printLoginSuccessMessage(message?: string) {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
    });
  }
  function _printLogoutSuccessMessage(message?: string) {
    toast.add({
      severity: 'info',
      summary: 'User loggout',
      detail: 'User logged out successfully',
      life: 5000,
    });
  }

  function _setToken(newToken: Token) {
    token.value = newToken;
    localStorage.setItem(config.ACCESS_TOKEN_KEY, newToken?.toString() || '');
  }

  function _removeToken() {
    localStorage.removeItem(config.ACCESS_TOKEN_KEY);
  }

  return { token, isAuthenticated, authenticate, logout, getToken };
});
