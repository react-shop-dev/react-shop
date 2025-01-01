'use server';

import { getCustomerByEmail } from '@/lib/customer/getCustomerByEmail';
import { saveCustomer } from '@/lib/customer/saveCustomer';
import { storageRemoveItem } from '@/lib/data/storage';
import bcrypt from 'bcryptjs';
import 'server-only';
import { getTokenByEmail } from '../helpers/getTokenByEmail';
import { getValueFromStorage } from '../helpers/getValueFromStorage';
import { TokenConfirm, VerificationResponse } from '@/types/auth';

export type NewPasswordAction = (
  values: { password: string; confirmPassword: string },
  token?: string,
  email?: string,
) => Promise<VerificationResponse>;

export const newPasswordAction: NewPasswordAction = async (values, token, email) => {
  try {
    if (!token) {
      throw new Error('Missing token!');
    }
    if (!email) {
      throw new Error('Missing e-mail!');
    }

    const existingToken = await getTokenByEmail(TokenConfirm.passwordResetToken, email);
    if (!existingToken) {
      throw new Error('Invalid token!');
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      throw new Error('Token has expired!');
    }

    const existingUser = await getCustomerByEmail(existingToken.email);
    if (!existingUser) {
      throw new Error('Email does not exist!');
    }

    const { password } = values;
    const hashedPassword = await bcrypt.hash(password, 10);

    await saveCustomer(String(existingUser.id), {
      ...getValueFromStorage(existingUser),
      password: hashedPassword,
    });

    await storageRemoveItem(`${TokenConfirm.passwordResetToken}:${email}`);

    return { type: 'success', message: 'Your Password was updated!' };
  } catch (error: unknown) {
    return {
      type: 'error',
      message: error instanceof Error ? error.message : (error as string),
    };
  }
};
