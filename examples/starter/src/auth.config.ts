import NextAuth from 'next-auth';

/**
 * @see https://authjs.dev/getting-started/installation?framework=next.js
 */

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  providers: [],
  events: {},
  trustHost: true,
});
