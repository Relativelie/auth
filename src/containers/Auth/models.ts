export enum AuthModeENUM {
  login = 'login',
  register = 'register',
}

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
