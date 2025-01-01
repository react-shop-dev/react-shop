import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { useAuthState } from './useAuthState';

export const Authenticated = (props: AuthenticatedProps) => {
  const { children } = props;

  const { authenticated } = useAuthState({ required: true });

  if (!authenticated) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

export interface AuthenticatedProps {
  children: ReactNode;
  authParams?: object;
  required?: boolean;
}
