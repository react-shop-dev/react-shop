import { Fragment } from 'react';
import { Title, GetOneProvider } from 'react-shop';
import { redirect } from 'next/navigation';
import { OrderShow } from '@/modules/order/OrderShow';

type Params = Promise<{ id?: string }>;

export default async function OrderDetailsPage({ params }: { params: Params }) {
  const id = (await params).id;

  if (!id) {
    redirect('/');
  }

  return (
    <Fragment>
      <Title title={`Order ${id}`} />
      <GetOneProvider id={id} resource="orders">
        <OrderShow />
      </GetOneProvider>
    </Fragment>
  );
}
