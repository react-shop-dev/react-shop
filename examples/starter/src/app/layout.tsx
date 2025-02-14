import { Shop } from 'react-shop/server';
import type { Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { NextAuthProvider } from 'react-shop-auth';
import { auth } from '@/auth.config';
import { StoreFront } from '@/modules/store/StoreFront';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  variable: '--shop-font-main',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authSession = await auth();

  return (
    <Shop className={roboto.className}>
      <NextAuthProvider session={authSession}>
        <StoreFront>{children}</StoreFront>
      </NextAuthProvider>
    </Shop>
  );
}
