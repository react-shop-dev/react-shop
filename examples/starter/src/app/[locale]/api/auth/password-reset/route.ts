import { type NextRequest, NextResponse } from 'next/server';

export async function POST(_req: NextRequest) {
  return new NextResponse('This is password reset api endpoint', {
    status: 200,
  });
}
