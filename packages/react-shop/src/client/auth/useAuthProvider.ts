import { useContext, useMemo } from 'react';
import defaults from 'lodash/defaults';
import { AuthContext, AuthProvideContext } from './AuthContext';
import { defaultAuthProvider } from './defaultAuthProvider';

export const useAuthProvider = (): AuthProvideContext => {
  const context = useContext(AuthContext);

  return useMemo(() => defaults({}, context, defaultAuthProvider), [context]);
};
