'use server';

import * as auth from '@/auth.config';

export async function signOut() {
  return auth.signOut();
}
