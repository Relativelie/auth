interface TokenManager {
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  getExpireDate(): Date | undefined;
  getRefreshExpireDate(): Date | undefined;
  setAccessToken(token: string): void;
  setRefreshToken(token: string): void;
  setExpireDate(token: string): void;
  setRefreshExpireDate(token: string): void;
  removeToken(): void;
}

class TokenManager implements TokenManager {
  private static ACCESS_TOKEN = 'access_token';
  private static REFRESH_TOKEN = 'refresh_token';
  private static EXPIRES_IN = 'expires_in';
  private static REFRESH_EXPIRES_IN = 'refresh_expires_in';

  static getAccessToken() {
    return localStorage.getItem(TokenManager.ACCESS_TOKEN);
  }

  static getRefreshToken() {
    return localStorage.getItem(TokenManager.REFRESH_TOKEN);
  }

  static getExpireDate() {
    const date = localStorage.getItem(TokenManager.EXPIRES_IN);
    if (date) {
      return new Date(parseInt(date));
    }
  }

  static getRefreshExpireDate() {
    const date = localStorage.getItem(TokenManager.REFRESH_EXPIRES_IN);
    if (date) {
      return new Date(parseInt(date));
    }
  }

  static setAccessToken(accessToken: string) {
    localStorage.setItem(TokenManager.ACCESS_TOKEN, accessToken);
  }

  static setRefreshToken(refreshToken: string) {
    localStorage.setItem(TokenManager.REFRESH_TOKEN, refreshToken);
  }

  static setExpireDate(expiresIn: string) {
    localStorage.setItem(TokenManager.EXPIRES_IN, expiresIn);
  }

  static setRefreshExpireDate(expiresIn: string) {
    localStorage.setItem(TokenManager.REFRESH_EXPIRES_IN, expiresIn);
  }

  static removeTokens() {
    localStorage.removeItem(TokenManager.ACCESS_TOKEN);
    localStorage.removeItem(TokenManager.REFRESH_TOKEN);
    localStorage.removeItem(TokenManager.EXPIRES_IN);
    localStorage.removeItem(TokenManager.REFRESH_EXPIRES_IN);
  }
}

export default TokenManager;
