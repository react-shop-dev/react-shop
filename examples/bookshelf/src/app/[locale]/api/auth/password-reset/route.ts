import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth/helpers/generateToken';
import { handleAuthError } from '@/lib/auth/helpers/handleAuthError';
import { sendPasswordResetEmail } from '@/lib/auth/mail/sendPasswordResetEmail';
import { emailSchema } from '@/lib/auth/schemas';
import { getCustomerByEmail } from '@/lib/customer/getCustomerByEmail';
import type { InferType } from 'yup';
import { TokenConfirm } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const values: InferType<typeof emailSchema> = await req.json();

    const { email } = await emailSchema.validate(values);

    const existingUser = await getCustomerByEmail(email);
    if (existingUser?.email !== email) {
      return new NextResponse('Email does not exists!', { status: 400 });
    }

    const passwordResetToken = await generateToken(TokenConfirm.passwordResetToken, email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
      req.nextUrl?.origin,
    );

    return new NextResponse('A password reset email has been sent to you.', {
      status: 200,
    });
  } catch (error) {
    handleAuthError(error);
  }
}
