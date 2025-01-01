import { type DefaultSession } from 'next-auth';

export type SignInUser = DefaultSession['user'] & {
  id: string;
  has_account?: boolean;
  password?: string;
  first_name?: string;
  last_name?: string;
  created_at?: Date | string | null;
};

declare module 'next-auth' {
  interface Session {
    user: SignInUser;
  }
}
