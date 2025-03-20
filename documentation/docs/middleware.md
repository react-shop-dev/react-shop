---
sidebar_position: 5
---

# Middleware

Next.js [middleware](https://nextjs.org/docs/pages/building-your-application/routing/middleware) is a way to run logic before accessing any page. On platforms like Vercel, middleware is run at the [Edge](https://nextjs.org/docs/pages/api-reference/edge.) environment.
<p>**React shop** provides ``shopMiddleware`` function which receives a object configuration and takes care of:</p>
- Configuring appropriate redirects and URL rewrites across your website.
- Control access to the routes and pages within your app.

## Basic usage

```js title="middleware.ts"
import { shopMiddleware } from 'react-shop/middleware';

export default shopMiddleware({ country: 'us' });

export const config = {
  // This matcher skips certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

```

:::tip
Defining the country is helpful, even if your store operates in a single region, as all routes should be defined using the ``[locale]`` dynamic segment.
:::

## Configuration

- **country**: Default county code in [ISO 2 format](https://www.iban.com/country-codes). It's usefull if you need multi-region support to parse local payment and shipping options, currencies, taxes, and more.
- **showCountry**: Show locale prefix in the pathname. Examples: ``https://my-store/us``, ``https://my-store/us/about``.
- **authRoutes**: An array of routes for handling sign-in and sign-out navigation. These routes should correspond to the paths where your authentication logic is implemented.
- **publicAuthRoutes**: An array of public routes used in the authentication flow, such as those for email verification or password recovery. These routes are accessible without authentication.
- **privateAuthRoute**: A secured route segment where authenticated users can access personal information such as profile details, order history, and payment methods.. 
- **countryCookie**: The name of the cookie that stores the previously detected country code for locale-based settings.
- **authTokenCookie**:  The name of the cookie used to identify whether the user is signed in.

| Option | Type | Default value |
| --- | --- | --- |
| **country** |  ``string`` or ``null`` | ``null`` |
| **showContry** | ``boolean`` |  ``false`` |
| **authRoutes** | ``Array<string>`` | ``['/auth/signout', '/auth/signin']`` |
| **publicAuthRoutes** | ``Array<string>``  | ``['/auth/verification', '/auth/new-password']`` |
| **privateAuthRoute** | ``string`` | ``'/account'``  |
| **authTokenCookie** | ``string`` | ``'authjs.session-token'`` |
| **countryCookie** | ``string`` or ``null`` | ``null`` |

:::note
If **shopMiddleware** function doesn't meet your requirements, you can build custom middleware flow and use library-specific middleware utilities, such as [``withAuth``](https://next-auth.js.org/configuration/nextjs#middleware) from NextAuth library.
:::
