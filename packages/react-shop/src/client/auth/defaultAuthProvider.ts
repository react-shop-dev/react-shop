import { AuthProvideContext } from './AuthContext';

export const defaultAuthProvider: AuthProvideContext = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  getIdentity: () => Promise.resolve({}),
  resetPassword: () => Promise.resolve(),
  getProviders: () => Promise.resolve(),
};
