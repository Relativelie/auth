import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import config from '../config';
import TokenManager from '../utils/tokenManager';
import AuthService from './auth';
import { showError } from '../utils/showError';

const authService = new AuthService();
const baseURL = config.BASE_URL;

const axiosRequests = axios.create({
  baseURL,
});

axiosRequests.interceptors.request.use(
  (config) => {
    const authToken = TokenManager.getAccessToken();
    if (authToken) {
      config = {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${authToken}` } as AxiosRequestHeaders,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const handleResponse = (response: AxiosResponse) => response.data;

const handleError = async (error: unknown) => {
  if (!axios.isAxiosError(error) || !error.response || !error.config) {
    showError(error);
    return;
  }
  const status = error.response.status;

  if (status === 401) {
    const rToken = TokenManager.getRefreshToken();
    if (rToken) {
      try {
        await authService.refreshToken(rToken);
        return await axiosRequests.request(error.config);
      } catch (e) {
        showError(e);
        return authService.logout();
      }
    } else {
      return authService.logout();
    }
  } else {
    showError(error);
    return authService.logout();
  }
};

axiosRequests.interceptors.response.use(handleResponse, handleError);

const getRequest = async (url: string): Promise<any> => {
  return await axiosRequests.get(url);
};

export { getRequest };
