import axios from 'axios';
import TokenManager from '../utils/tokenManager';
import { redirect } from 'react-router-dom';
import { showError } from '../utils/showError';

export type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scope: string;
};

export interface Credentials {
  email: string;
  password: string;
}

interface IAuthService {
  login(credentials: Credentials): Promise<void>;
  register(credentials: Credentials): Promise<void>;
  logout(): Response;
  refreshToken(refreshToken: string): Promise<void>;
  isAuthenticated(): boolean;
}

class AuthService implements IAuthService {
  private baseURL = process.env.REACT_APP_BASE_URL;
  private _loginUrl = `${this.baseURL}/api/login`;
  private _registerUrl = `${this.baseURL}/api/register`;
  private _refreshUrl = `${this.baseURL}/api/refresh`;

  login = async (credentials: Credentials) => {
    try {
      const response = await axios.post(this._loginUrl, { ...credentials });
      AuthService._setTokens(response.data);
    } catch (error) {
      showError(error);
    }
  };

  refreshToken = async (refreshToken: string) => {
    try {
      const response = await axios.post(this._refreshUrl, {
        refreshToken,
      });

      const tokenData: TokenResponse = response.data;

      AuthService._resetAccessToken(tokenData);
    } catch (error) {
      showError(error);
      this.logout();
    }
  };

  logout = () => {
    TokenManager.removeTokens();
    return redirect('/auth');
  };

  isAuthenticated = () => {
    const accessToken = TokenManager.getAccessToken();
    const expireDate = TokenManager.getExpireDate();
    const refreshExpireDate = TokenManager.getRefreshExpireDate();
    const refreshToken = TokenManager.getRefreshToken();

    if (!accessToken || !expireDate || !refreshExpireDate || !refreshToken) {
      return false;
    }

    const now = new Date();
    const expire = new Date(expireDate);
    const refreshExpire = new Date(refreshExpireDate);

    return now < expire && now < refreshExpire;
  };

  register = async (credentials: Credentials) => {
    try {
      const response = await axios.post(this._registerUrl, { ...credentials });
      AuthService._setTokens(response.data);
    } catch (error) {
      showError(error);
    }
  };

  private static _setTokens = (authData: TokenResponse) => {
    TokenManager.setAccessToken(authData.access_token);
    TokenManager.setRefreshToken(authData.refresh_token);
    TokenManager.setExpireDate(authData.expires_in.toString());
    TokenManager.setRefreshExpireDate(authData.refresh_expires_in.toString());
  };

  private static _resetAccessToken = (authData: TokenResponse) => {
    TokenManager.setAccessToken(authData.access_token);
    TokenManager.setExpireDate(authData.expires_in.toString());
  };
}

export default AuthService;
