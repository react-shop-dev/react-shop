import { jwtAuthConfig } from 'react-shop-auth/server';
import NextAuth, { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import { UnstorageAdapter } from '@auth/unstorage-adapter';
import bcrypt from 'bcryptjs';
import merge from 'deepmerge';
import { STORAGE_USER_PREFIX } from './lib/constants';
import { getCustomerFromDB } from './lib/customer/getCustomerFromDB';
import { storage } from './storage.config';

const adapter = UnstorageAdapter(storage, { userKeyPrefix: STORAGE_USER_PREFIX });

const providers = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  TwitterProvider({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
  }),
  Credentials({
    async authorize(credentials) {
      const { email, password } = credentials;
      const user = await getCustomerFromDB(undefined, email as string);
      if (!user || !user.password) {
        return null;
      }
      const passwordsMatch = await bcrypt.compare(password as string, user.password);

      if (passwordsMatch) {
        return user as User;
      }
      return null;
    },
  }),
];

/**
 * @see https://authjs.dev/getting-started/installation?framework=next.js
 */

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(
  merge(jwtAuthConfig(getCustomerFromDB), {
    useSecureCookies: process.env.NODE_ENV === 'production',
    adapter,
    providers,
    events: {},
    trustHost: true,
  } satisfies NextAuthConfig),
);
