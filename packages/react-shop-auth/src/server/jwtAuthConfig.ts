import type { NextAuthConfig } from 'next-auth';
import type { Identifier } from 'react-shop-types';
import type { User, Account } from '@auth/core/types';
import type { SignInUser } from '../types';
import { type JWT, session } from './session';

export const jwtAuthConfig = (
  getUserFromDB: (
    id?: Identifier,
    email?: string | null,
  ) => Promise<Omit<SignInUser, 'id'> | null | undefined>,
): Omit<NextAuthConfig, 'providers'> => {
  const signIn = async ({ user, account }: { user: User; account: Account | null }) => {
    if (account?.type === 'oauth' || account?.type === 'oidc') {
      return true;
    }
    try {
      const existingUser = await getUserFromDB(user?.id, user?.email);
      if (
        Object.prototype.hasOwnProperty.call(existingUser, 'has_account') &&
        existingUser?.has_account === false
      ) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error occurred during sign in:', error);
      return false;
    }
  };

  const jwt = async ({ token }: { token: JWT }) => {
    if (!token.sub) {
      return token;
    }
    const existingUser = await getUserFromDB(token?.sub, token?.email);
    token.name = existingUser?.name ?? token.name;
    token.first_name = existingUser?.first_name ?? token.first_name;
    token.last_name = existingUser?.last_name ?? token.last_name;

    token.email = existingUser?.email ?? token.email;
    token.picture = existingUser?.image ?? token.picture;
    return token;
  };

  return {
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
    },
    callbacks: {
      signIn,
      session,
      jwt,
    },
  } satisfies Omit<NextAuthConfig, 'providers'>;
};
