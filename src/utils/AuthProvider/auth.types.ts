import { User } from '../../types/User';
import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';

export enum CookieKeys {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
}

export enum GrantType {
  UserPassword = 'USER_PASSWORD_AUTH',
  RefreshToken = 'REFRESH_TOKEN_AUTH',
  ChallengeNewPassword = 'NEW_PASSWORD_REQUIRED',
}

export interface apricotIdTokenPayload extends CognitoIdTokenPayload {
  name: string;
  email: string;
  ['custom:studioId']: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface SetupAccountBody {
  name: string;
  email: string;
  newPassword: string;
}

export interface AuthenticationResponse {
  challengeName?: string;
  session?: string;
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
  user: User;
}
