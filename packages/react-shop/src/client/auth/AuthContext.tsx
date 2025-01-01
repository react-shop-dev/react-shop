import { createContext } from 'react';

export type UserIdentity = {
  id?: string;
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type AuthProvideContext = {
  login: (params: any) => Promise<any>;
  logout: (params: any) => Promise<any>;
  signUp: (params: any) => Promise<any>;
  checkAuth: (params: any) => Promise<any>;
  getIdentity: () => Promise<UserIdentity>;
  resetPassword: (params: any) => Promise<any>;
  getProviders: () => Promise<any>;
};

export const AuthContext = createContext<AuthProvideContext | null>(null);

AuthContext.displayName = 'AuthContext';
