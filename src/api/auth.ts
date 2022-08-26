import axios from '../config/http-common';
import Cookies from 'universal-cookie';
import {
  SetupAccountBody,
  CookieKeys,
  GrantType,
  LoginBody,
} from '../utils/AuthProvider/auth.types';

export const useLoginRequest = ({ email, password }: LoginBody) => {
  return axios
    .post('/auth/oauth/token', {
      grantType: GrantType.UserPassword,
      authParams: {
        email,
        password,
      },
    })
    .then((response) => response.data);
};

export const useRefreshRequest = () => {
  const cookies = new Cookies();
  return axios
    .post('/auth/oauth/token', {
      grantType: GrantType.RefreshToken,
      authParams: {
        refreshToken: cookies.get(CookieKeys.refreshToken),
      },
    })
    .then((response) => response.data);
};

export const useSetupAccount = ({
  email,
  newPassword,
  session,
  name,
}: SetupAccountBody & { session: string }) => {
  return axios
    .post('/auth/oauth/token', {
      grantType: GrantType.ChallengeNewPassword,
      challengeResponses: {
        email,
        newPassword,
        session,
      },
      userAttributes: {
        name,
      },
    })
    .then((response) => response.data);
};
