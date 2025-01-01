'use server';

import * as auth from '@/auth.config';

export async function signIn(provider: string) {
  return auth.signIn(provider);
}
