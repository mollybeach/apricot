import axios from '../../config/http-common';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosRequestConfig } from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Role, User } from '../../types/User';
import {
  AuthenticationResponse,
  SetupAccountBody,
  CookieKeys,
  GrantType,
  apricotIdTokenPayload,
} from './auth.types';
import {
  useLoginRequest,
  useRefreshRequest,
  useSetupAccount,
} from '../../api/auth';
import jwtDecode from 'jwt-decode';

const cookies = new Cookies();

export interface IAuthContext {
  login: (username: string, password: string) => void;
  setupAccount: (body: SetupAccountBody) => void;
  logout: () => void;
  isAuthenticated?: boolean;
  errorMessage?: string;
  user?: User;
}

export const AuthContext = React.createContext<IAuthContext>(null);

export default function AuthProvider(props: any) {
  const navigate = useNavigate();
  const accessTokenRef = useRef<string>();
  const expiresInRef = useRef<number>();
  const refreshTokenRef = useRef<string>();
  const newPasswordSessionRef = useRef<string>();
  const userRef = useRef<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const loginQuery = useMutation(useLoginRequest, {
    onSuccess: (data: AuthenticationResponse) => {
      console.log(data);
      if (data.challengeName === GrantType.ChallengeNewPassword) {
        newPasswordSessionRef.current = data.session;
        navigate('/login/setup');
      } else {
        setRefsAndCookies(data);
      }
    },
    onError: (error: any) => {
      accessTokenRef.current = null;
      cookies.remove(CookieKeys.accessToken);
      // cookies.remove(CookieKeys.refreshToken);
      setErrorMessage(
        error.response.data?.message ?? 'Oops something went wrong!',
      );
    },
  });

  const refreshQuery = useMutation(useRefreshRequest, {
    onSuccess: (data: AuthenticationResponse) => {
      setRefsAndCookies(data);
    },
    onError: (error: any) => {
      navigate('/login');
      console.error(error);
    },
  });

  const setupAccountQuery = useMutation(useSetupAccount, {
    onSuccess: (data: AuthenticationResponse) => {
      setRefsAndCookies(data);
    },
    onError: (error: any) => {
      setErrorMessage(
        error.response.data?.message ?? 'Oops something went wrong!',
      );
    },
  });

  const setRefsAndCookies = (data: AuthenticationResponse) => {
    if (data.idToken) {
      const idTokenData: apricotIdTokenPayload =
        jwtDecode<apricotIdTokenPayload>(data.idToken);

      userRef.current = {
        email: idTokenData.email as string,
        name: idTokenData.name as string,
      };
      userRef.current.primaryRole = idTokenData['cognito:groups'][0] as Role;
      userRef.current.isOperator =
        userRef.current.primaryRole === Role.apricotOperator;
    }
    accessTokenRef.current = data.accessToken;
    expiresInRef.current = data.expiresIn;
    if (data.refreshToken) {
      refreshTokenRef.current = data.refreshToken;
      cookies.set(CookieKeys.refreshToken, data.refreshToken);
    }
    setIsAuthenticated(true);
    cookies.set(CookieKeys.accessToken, data.accessToken, {
      expires: new Date(Date.now() + data.expiresIn * 1000),
    });
  };

  const login = async (email: string, password: string) => {
    return loginQuery.mutateAsync({ email, password });
  };

  const setupAccount = (body: SetupAccountBody) => {
    return setupAccountQuery.mutateAsync({
      session: newPasswordSessionRef.current,
      ...body,
    });
  };

  const logout = () => {
    cookies.remove(CookieKeys.accessToken);
    cookies.remove(CookieKeys.refreshToken);
    userRef.current = null;
    accessTokenRef.current = null;
    refreshTokenRef.current = null;
    setIsAuthenticated(false);
    navigate('/login');
  };

  const setAxiosConfig = () => {
    axios.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.headers.authorization = `Bearer ${accessTokenRef.current}`;
        // this is important to include the cookies when we are sending the requests to the backend.
        config.withCredentials = true;
        return config;
      },
    );
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        return Promise.reject(error);
      },
    );
  };

  useEffect(() => {
    console.log(cookies.get(CookieKeys.refreshToken));
    if (cookies.get(CookieKeys.accessToken)) {
      refreshQuery.mutate();
      accessTokenRef.current = cookies.get(CookieKeys.accessToken);
      expiresInRef.current = cookies.get(CookieKeys.accessToken)?.expires;
      refreshTokenRef.current = cookies.get(CookieKeys.refreshToken);
    }
    setAxiosConfig();
  }, []);

  useEffect(() => {
    setAxiosConfig();
  }, [accessTokenRef]);

  return (
    <AuthContext.Provider
      value={{
        login,
        setupAccount,
        logout,
        isAuthenticated,
        errorMessage,
        user: userRef.current,
        ...props,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
