'use server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import deepmerge from 'deepmerge';
import { applyBasePath, formatPathname, normalizePathname, sanitizePathname } from './utils';
import { middlewareConfig, ShopMiddlewareConfig } from './middlewareConfig';
import { DOMAIN_ORIGIN_HEADER, COUNTRY_KEY } from 'src/constants';

export const shopMiddleware = (config: ShopMiddlewareConfig = {}) => {
  const {
    country: defaultCountry,
    countryCookie,
    showCountry,
    authRoutes,
    privateAuthRoute,
    publicAuthRoutes,
    authTokenCookie,
  } = deepmerge(middlewareConfig, config) as ShopMiddlewareConfig;

  return function middleware(request: NextRequest) {
    const unsafePathname = decodeURI(request.nextUrl.pathname);
    const pathname = normalizePathname(sanitizePathname(unsafePathname));

    const isAuthRoute = new Set(authRoutes)?.has(pathname);
    const isPublicAuthRoute = new Set(publicAuthRoutes)?.has(pathname);
    const isLoggedIn = authTokenCookie && request.cookies.get(authTokenCookie)?.value;

    let country = defaultCountry;

    if (countryCookie && request.cookies.get(countryCookie)?.value) {
      country = request.cookies.get(countryCookie)?.value;
    }

    function redirect(url: string) {
      const urlObj = new URL(url, request.url);
      if (request.nextUrl.basePath) {
        urlObj.pathname = applyBasePath(urlObj.pathname, request.nextUrl.basePath);
      }

      return NextResponse.redirect(urlObj.toString());
    }

    function rewrite(url: string) {
      const urlObj = new URL(url, request.url);
      if (request.nextUrl.basePath) {
        urlObj.pathname = applyBasePath(urlObj.pathname, request.nextUrl.basePath);
      }

      const headers = new Headers(request.headers);
      return NextResponse.rewrite(urlObj, { request: { headers } });
    }

    let response;

    const urlHasCountry = country && request.nextUrl.pathname.split('/')[1].includes(country);

    if (!country || urlHasCountry) {
      response = NextResponse.next();
    } else {
      const redirectPathname =
        isPublicAuthRoute && isLoggedIn
          ? (privateAuthRoute as string)
          : isAuthRoute
            ? '/'
            : undefined;
      if (showCountry || redirectPathname) {
        response = redirect(
          formatPathname(redirectPathname || pathname, `/${country}`, request.nextUrl.search),
        );
      } else {
        response = rewrite(formatPathname(pathname, `/${country}`, request.nextUrl.search));
      }
    }

    if (country && !countryCookie) {
      response?.cookies.set(COUNTRY_KEY, country);
    }

    response.headers.set(DOMAIN_ORIGIN_HEADER, request.nextUrl.origin);

    return response;
  };
};
