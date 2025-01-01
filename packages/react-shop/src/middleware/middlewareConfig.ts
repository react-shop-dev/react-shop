export interface ShopMiddlewareConfig {
  country?: string | null;
  showCountry?: boolean;
  authRoutes?: Array<string>;
  privateAuthRoute?: string;
  publicAuthRoutes?: Array<string>;
  authTokenCookie?: string;
  countryCookie?: string | null;
}

export const middlewareConfig: ShopMiddlewareConfig = {
  country: null,
  showCountry: false,
  authRoutes: ['/auth/signout', '/auth/signin'],
  publicAuthRoutes: ['/auth/verification', '/auth/new-password'],
  privateAuthRoute: '/account',
  authTokenCookie: 'authjs.session-token',
  countryCookie: null,
};
