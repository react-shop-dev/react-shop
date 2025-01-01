import type { ReactNode } from 'react';
import { getShopConfig } from 'react-shop/functions';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { NextAuthAdapter } from './NextAuthAdapter';
import { WithRequiredProperty } from 'react-shop-types';

export type AuthProviderProps = WithRequiredProperty<SessionProviderProps, 'session'> & {
  children: ReactNode;
};

export const NextAuthProvider = ({ children, session, ...rest }: AuthProviderProps) => {
  const { config } = getShopConfig();

  const basePath = config?.paths?.baseUrl ?? '';
  const apiRoute = config?.auth?.authApiRoute ?? '/api/auth';

  const authBasePath = `${basePath}${apiRoute}`;

  return (
    <SessionProvider basePath={authBasePath} session={session} {...rest}>
      <NextAuthAdapter
        apiRoute={apiRoute}
        registerApi={config?.auth?.registerApi}
        resetPasswordApi={config?.auth?.resetPasswordApi}
      >
        {children}
      </NextAuthAdapter>
    </SessionProvider>
  );
};
