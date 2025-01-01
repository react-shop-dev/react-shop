'use server';

import { getCustomerByEmail } from '@/lib/customer/getCustomerByEmail';
import { saveCustomer } from '@/lib/customer/saveCustomer';
import { storageRemoveItem } from '@/lib/data/storage';
import 'server-only';
import { getTokenByEmail } from '../helpers/getTokenByEmail';
import { getValueFromStorage } from '../helpers/getValueFromStorage';
import { TokenConfirm, VerificationResponse } from '@/types/auth';

export type CheckVerificationAction = (
  email?: string,
  token?: string,
) => Promise<VerificationResponse>;

export const checkVerification: CheckVerificationAction = async (email, token) => {
  try {
    if (!token) {
      throw new Error('Missing token!');
    }
    if (!email) {
      throw new Error('Missing E-mail!');
    }

    const data = await getTokenByEmail(TokenConfirm.verificationToken, email);

    if (data?.token !== token) {
      throw new Error('Invalid token!');
    }

    const hasExpired = new Date(data?.expires) < new Date();
    if (hasExpired) {
      throw new Error('Token has expired!');
    }

    const existingUser = await getCustomerByEmail(email);
    if (!existingUser) {
      throw new Error('Email does not exist!');
    }

    await saveCustomer(String(existingUser.id), {
      ...getValueFromStorage(existingUser),
      has_account: true,
    });

    await storageRemoveItem(`${TokenConfirm.verificationToken}:${email}`);

    return { type: 'success', message: 'Email verified!' };
  } catch (error: unknown) {
    return {
      type: 'error',
      message: error instanceof Error ? error.message : (error as string),
    };
  }
};
