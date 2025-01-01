import type { NextRequest, NextResponse } from 'next/server';

/**
 *  Combine multiple middlewares
 *
 *  const redirectMiddleware = async (req, res) => {
 *    if (req.nextUrl.pathname.startsWith('/about')) {
 *      return NextResponse.rewrite(new URL('/contacts', req.url));
 *    }
 *    return NextResponse.next();
 *  };
 *
 *  const setHeaderMiddleware = async (req, res) => {
 *    const requestHeaders = new Headers(req.headers);
 *    requestHeaders.set('x-test-header', 'test-value');
 *    return NextResponse.next({
 *        headers: requestHeaders,
 *     });
 *  };
 *
 *  export default combineMiddleware([middleware1, middleware2])
 */

export type MiddlewareFunction = (
  req: NextRequest,
  res?: NextResponse,
  options?: any,
) => Promise<NextResponse | null>;

export const combineMiddleware =
  (middlewareFunctions: MiddlewareFunction[]) =>
  async (req: NextRequest, res: NextResponse): Promise<NextResponse> => {
    let nextResponse: NextResponse = res;

    for await (const middlewareFunction of middlewareFunctions) {
      if (typeof middlewareFunction !== 'function') {
        throw new Error(`Middleware function must be a function: ${middlewareFunction}`);
      }
      try {
        const newNextResponse = await middlewareFunction(req, nextResponse);
        if (newNextResponse) {
          nextResponse = newNextResponse;
        }
      } catch (error: any) {
        console.error(`Error in middleware function: ${error.message}`);
      }
    }

    return nextResponse;
  };
