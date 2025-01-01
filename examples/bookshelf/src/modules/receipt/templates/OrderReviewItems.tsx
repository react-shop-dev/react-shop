import { Fragment } from 'react';
import type { Order } from 'react-shop-types';
import LineItems from '@/modules/common/LineItems';
import OrderTitle from '@/modules/order/components/OrderTitle';

export const OrderReviewItems = ({ order }: { order: Order }) => {
  return (
    <Fragment>
      <OrderTitle>Summary</OrderTitle>
      <LineItems data={order.items} />
    </Fragment>
  );
};
