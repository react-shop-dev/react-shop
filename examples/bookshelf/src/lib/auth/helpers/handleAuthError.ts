import { NextResponse } from 'next/server';
import { ValidationError } from 'yup';

export const handleAuthError = (error: unknown) => {
  if (error instanceof ValidationError) {
    return new NextResponse(`${error.message} `, { status: 400 });
  }
  return new NextResponse('Internal error', { status: 500 });
};
