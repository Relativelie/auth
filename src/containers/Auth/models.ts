export enum AuthModeENUM {
  login = 'Login',
  register = 'Register',
}

export type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
};

export interface Credentials {
  email: string;
  password: string;
}
