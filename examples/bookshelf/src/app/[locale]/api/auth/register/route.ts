import type { SignInUser } from 'react-shop-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth/helpers/generateToken';
import { handleAuthError } from '@/lib/auth/helpers/handleAuthError';
import { sendVerificationEmail } from '@/lib/auth/mail/sendVerificationEmail';
import { userSchema } from '@/lib/auth/schemas';
import { generateCustomerID } from '@/lib/customer/generateCustomerID';
import { getCustomerByEmail } from '@/lib/customer/getCustomerByEmail';
import { saveCustomer } from '@/lib/customer/saveCustomer';
import bcrypt from 'bcryptjs';
import type { InferType } from 'yup';
import { TokenConfirm } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const values: InferType<typeof userSchema> = await req.json();
    const { email, password, first_name, last_name } = await userSchema.validate(values);

    const existingUser = await getCustomerByEmail(email);

    if (existingUser?.has_account) {
      return new NextResponse('Email address is already registered', {
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = generateCustomerID(email);

    const verificationToken = await generateToken(TokenConfirm.verificationToken, email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      req.nextUrl?.origin,
    );

    const newCustomer: SignInUser = {
      id,
      email,
      password: hashedPassword,
      name: `${first_name} ${last_name}`,
      first_name,
      last_name,
      has_account: false,
      created_at: new Date(),
    };
    await saveCustomer(id, newCustomer);

    return new NextResponse('Please verify your email by checking your inbox', {
      status: 200,
    });
  } catch (error) {
    handleAuthError(error);
  }
}
