import { Fragment, Suspense } from 'react';
import { Head, Title } from 'react-shop';
import { Loader } from 'react-shop-mui/Loader';
import { redirect } from 'next/navigation';
import { OrderReview } from '@/modules/receipt/OrderReview';
import OrderReviewHolder from '@/modules/receipt/templates/OrderReviewHolder';

type Params = Promise<{ id?: string }>;

export default async function OrderConfirmedPage({ params }: { params: Params }) {
  const id = (await params).id;

  if (!id) {
    redirect('/');
  }

  return (
    <Fragment>
      <Title title="Order confirmed" />
      <Head>
        <meta name="description" content="Order has been successfully placed" />
      </Head>
      <OrderReviewHolder>
        <Suspense fallback={<Loader />}>
          <OrderReview id={id} />
        </Suspense>
      </OrderReviewHolder>
    </Fragment>
  );
}
