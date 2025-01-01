import { NextAuthProvider } from 'react-shop-auth';
import { Region } from 'react-shop-types';
import { Shop } from 'react-shop/server';
import type { Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { auth } from '@/auth.config';
import { fetchList } from '@/lib/data/fetch';
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
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const authSession = await auth();
  const { data: regions } = await fetchList<Region>('regions');

  return (
    <Shop
      className={roboto.className}
      regions={regions}
      meta={<meta name="emotion-insertion-point" content="" />}
    >
      <NextAuthProvider session={authSession}>
        <StoreFront>{children}</StoreFront>
      </NextAuthProvider>
    </Shop>
  );
}
