import { cookies } from 'next/headers';
import serialize from 'serialize-javascript';
import type { Identifier } from 'react-shop-types';
import type { SetCookieProps } from '@lib/cookies';
import { COOKIE_ACCEPT_NAME, VIEWED_PRODUCTS_COOKIE } from 'src/constants';
import { safeJSONParse } from '@functions/saveJSONParse';

const MAX_PRODUCTS = 4;
const EXPIRES = 7 * 24 * 60 * 60 * 1000; // ONE WEEK

export type GetViewedResult = string[];

export async function getViewedProducts(
  name = VIEWED_PRODUCTS_COOKIE,
  productId?: Identifier,
): Promise<GetViewedResult> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(name)?.value;
  const data = cookieValue ? safeJSONParse(cookieValue) : [];
  return productId ? data.filter((id: string) => id !== productId) : data;
}

export async function manageViewedProduct(
  productId: string,
  name = VIEWED_PRODUCTS_COOKIE,
  max = MAX_PRODUCTS,
  options?: SetCookieProps,
) {
  const cookieStore = await cookies();
  if (!cookieStore.has(COOKIE_ACCEPT_NAME)) {
    return;
  }
  try {
    const viewedProducts = (await getViewedProducts(name, productId)) || [];
    viewedProducts.unshift(productId);

    cookieStore.set(name, serialize(viewedProducts.slice(0, max)), {
      maxAge: EXPIRES,
      ...options,
    });
  } catch {
    /* Avoid next.js error during page rendering */
  }
}
