import { headers } from 'next/headers';
import { AVAILABLE_LOCALES_HEADER, DOMAIN_ORIGIN_HEADER, LOCALE_HEADER } from 'src/constants';

export type GetHeadersResult = {
  ip: string;
  host: string;
  defaultLocale: string;
  locales: string | null;
};

export default async function getHeaders(): Promise<GetHeadersResult> {
  const headersInstance = await headers();
  const defaultLocale = headersInstance?.get(LOCALE_HEADER) || '';
  const locales = headersInstance?.get(AVAILABLE_LOCALES_HEADER);
  const ip = (headersInstance.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  const host =
    headersInstance?.get(DOMAIN_ORIGIN_HEADER) ||
    process.env.__NEXT_PRIVATE_ORIGIN ||
    process.env.NEXT_PUBLIC_APP_URL!;

  return {
    ip,
    host,
    defaultLocale,
    locales,
  };
}
