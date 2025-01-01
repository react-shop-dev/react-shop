import type { ReactNode } from 'react';
import { AuthProvider, UserIdentity } from 'react-shop';
import type { RedirectableProviderType, SignInPageErrorParam } from 'react-shop-types';
import {
  signIn,
  SignInOptions,
  SignInAuthorizationParams,
  getCsrfToken,
  SignOutParams,
  signOut,
  getProviders,
  SignInResponse,
} from 'next-auth/react';
import type { SignInUser } from 'src/types';
import type { OAuthProviderType } from '@auth/core/providers';
import { fetchUtil } from 'src/utils/fetchUtil';
import { useSessionContext } from './useSessionContext';

export interface NextAuthAdapterProps {
  children: ReactNode;
  apiRoute?: string;
  registerApi?: string;
  resetPasswordApi?: string;
}

export const NextAuthAdapter = (props: NextAuthAdapterProps) => {
  const { apiRoute = '/api/auth', registerApi, resetPasswordApi, children } = props;

  const session = useSessionContext();

  const login = async (params: {
    provider?: RedirectableProviderType | OAuthProviderType;
    options?: SignInOptions;
    authorizationParams?: SignInAuthorizationParams;
  }) => {
    const { provider, options, authorizationParams, ...rest } = params;
    return signIn(provider, { redirect: false, ...options, ...rest }, authorizationParams).then(
      (result: SignInResponse | undefined) => {
        if (result?.error) {
          return Promise.reject({
            message: signInErrors[result.error as keyof SignInErrorType] || 'Unable to sign in',
          });
        }
        if (provider === 'nodemailer') {
          return { message: successMessage.email };
        }
        return result;
      },
    );
  };

  const logout = async (params?: SignOutParams) => signOut({ redirect: false, ...params });

  const signUp = async (data: SignInUser) => {
    const url = `${apiRoute}/${registerApi}`;
    return fetchUtil(url, { ...data });
  };

  const resetPassword = async (data: { email: string }) => {
    const csrfToken = await getCsrfToken();
    const url = `${apiRoute}/${resetPasswordApi}`;
    return fetchUtil(url, { ...data, _csrfToken: csrfToken });
  };

  const checkAuth = ({
    required,
    onUnauthenticated,
  }: {
    required: boolean;
    onUnauthenticated: () => void;
  }) => {
    return new Promise((resolve, reject) => {
      if (session?.status !== 'loading') {
        const requiredAndNotLoading = required && session?.status === 'unauthenticated';

        if (requiredAndNotLoading) {
          const url = `${window.location.origin}/${apiRoute}/signin?${new URLSearchParams({
            error: 'SessionRequired',
            callbackUrl: window.location.href,
          })}`;
          if (onUnauthenticated) {
            onUnauthenticated();
          } else {
            window.location.href = url;
          }
        }
        if (session?.status === 'authenticated') {
          resolve(true);
        }
        reject('Unathorized');
      }
    });
  };

  const getIdentity = (): Promise<UserIdentity> => {
    return new Promise((resolve, reject) => {
      if (session?.status !== 'loading') {
        session?.status === 'authenticated'
          ? resolve(session.data?.user)
          : reject('Failed to get identity');
      }
    });
  };

  return (
    <AuthProvider
      value={{
        login,
        logout,
        resetPassword,
        signUp,
        getIdentity,
        checkAuth,
        getProviders,
      }}
    >
      {children}
    </AuthProvider>
  );
};

type SignInErrorType = { [key in SignInPageErrorParam]?: string };

const successMessage = {
  email: 'A sign in link has been sent to your email address',
};

const signInErrors: SignInErrorType = {
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  OAuthCallbackError: 'Try signing in with a different account',
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  SessionRequired: 'Please sign in to access this page.',
  EmailSignin: 'The e-mail could not be sent.',
  OAuthCreateAccount: 'Try signing in with a different account.',
};
