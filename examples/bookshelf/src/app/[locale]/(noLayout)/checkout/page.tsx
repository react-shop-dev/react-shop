import { Suspense } from 'react';
import { Loader } from 'react-shop-mui/Loader';
import { getCookies } from 'react-shop/server';
import { notFound } from 'next/navigation';
import CheckoutMain from '@/modules/checkout/CheckoutMain';
import CheckoutSummary from '@/modules/checkout/CheckoutSummary';
import { CheckoutGrid } from '@/modules/checkout/templates/CheckoutGrid';

/**
 * If you have configured CartAdapter in ShopClient, you should get cartId from cookie
 * and check if cartId exists instead of using id from searchParams and sessionID.
 * @example
 *  import { cookies } from "next/headers"
 *
 *  const cookieStore = await cookies();
 *  const cartId = cookieStore.get(<your cart id key>)?.value;
 *
 *  if (!cartId) {
 *    return notFound();
 *  }
 *
 * Also fetch cart by cartId and check if cart is available
 *
 * @example
 *  import { getCart } from "<path to actions>"
 *
 *  const cart = await getCart(cartId);
 *
 *  if (!cart) {
 *    return notFound();
 *  }
 *
 */

type SearchParams = Promise<{ id?: string; payment?: string }>;

export default async function CheckoutPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { sessionID } = await getCookies();

  if (searchParams?.id && sessionID !== searchParams?.id) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('Invalid Session ID');
    }
    notFound();
  }

  return (
    <CheckoutGrid summary={<CheckoutSummary />}>
      <Suspense fallback={<Loader />}>
        <CheckoutMain payment={searchParams?.payment} />
      </Suspense>
    </CheckoutGrid>
  );
}
