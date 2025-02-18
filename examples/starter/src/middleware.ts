import { shopMiddleware } from 'react-shop/middleware';

export default shopMiddleware({ country: 'us' });

export const config = {
  // This matcher skips certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
