import type { Session } from 'next-auth';
import { omit } from '../utils/omit';

export const session = async ({ token, session }: { session: Session; token: JWT }) => {
  if (!session.user) {
    return session;
  }
  session.user = {
    ...session.user,
    ...omit(token, ['picture', 'sub', 'jti', 'iat', 'exp']),
    id: token.sub || session.user.id,
    image: token.picture,
  };
  return session;
};

export type JWT = Record<string, any> & {
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  picture?: string | null;
  sub?: string;
  iat?: number;
  exp?: number;
  jti?: string;
};
