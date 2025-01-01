import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import MiddlewareConfig from 'next-intl/dist/middleware/NextIntlMiddlewareConfig';

export type IntlMiddlewareParams = { req: any; defaultLocale?: string } & Omit<
  MiddlewareConfig,
  'defaultLocale'
>;

export const intlMiddleware: (
  params: IntlMiddlewareParams,
) => Promise<NextResponse<unknown>> = async params => {
  const { req, defaultLocale: defaultLocaleProp = 'en', locales, ...rest } = params;
  const defaultLocale = req.headers.get('x-default-locale') || defaultLocaleProp;

  const handleI18nMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'never',
    ...rest,
  });
  const response = handleI18nMiddleware(req);

  response.headers.set('x-default-locale', defaultLocale);
  response.headers.set('x-available-locales', locales.join());

  return response;
};
