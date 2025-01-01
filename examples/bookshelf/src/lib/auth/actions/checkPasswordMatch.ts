'use server';

import { getCustomerByEmail } from '@/lib/customer/getCustomerByEmail';
import bcrypt from 'bcryptjs';

export const checkPasswordMatch = async (email: string, password: string) => {
  const user = await getCustomerByEmail(email);
  if (!user || !user.password) {
    return null;
  }
  return await bcrypt.compare(password as string, user.password);
};
