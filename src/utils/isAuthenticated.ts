import TokenManager from './tokenManager';

export const isAuthenticated = () => {
  const accessToken = TokenManager.getAccessToken();
  const expireDate = TokenManager.getExpireDate();
  const refreshExpireDate = TokenManager.getRefreshExpireDate();
  const refreshToken = TokenManager.getRefreshToken();

  if (!accessToken || !expireDate || !refreshExpireDate || !refreshToken) {
    return false;
  }

  const now = new Date();
  const refreshExpire = new Date(refreshExpireDate);

  return now < refreshExpire;
};
