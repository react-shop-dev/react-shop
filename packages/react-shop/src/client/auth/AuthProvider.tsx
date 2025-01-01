import type { ReactNode } from 'react';
import { AuthContext, AuthProvideContext } from './AuthContext';

export const AuthProvider = ({
  value,
  children,
}: {
  value: AuthProvideContext;
  children: ReactNode;
}) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
