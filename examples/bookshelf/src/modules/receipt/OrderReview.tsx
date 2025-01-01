'use client';

import { Fragment } from 'react';
import { useSuspenseGetOne } from 'react-shop';
import type { Identifier, Order } from 'react-shop-types';
import Divider from '@mui/material/Divider';
import { format as dateFormat } from 'date-fns';
import OrderTitle from '../order/components/OrderTitle';
import { OrderReviewHeading } from './components/OrderReviewHeading';
import OrderReviewItem from './components/OrderReviewtem';
import { SuccessAnimation } from './components/SuccessAnimation';
import { OrderReviewDetails } from './templates/OrderReviewDetails';
import { OrderReviewItems } from './templates/OrderReviewItems';
import OrderReviewPayments from './templates/OrderReviewPayments';
import OrderReviewTotal from './templates/OrderReviewTotal';

export const OrderReview = ({ id }: { id: Identifier }) => {
  const { data: order } = useSuspenseGetOne<Order>(
    'orders',
    { id },
    {
      retry: false,
    },
  );

  return (
    <Fragment>
      <OrderReviewHeading
        icon={
          <div>
            <SuccessAnimation />
          </div>
        }
      >
        Thank you!
      </OrderReviewHeading>
      <OrderTitle textAlign="center">Your order has been successfully placed</OrderTitle>
      <OrderReviewItem label="Order ID" node={`# ${order.display_id}`} />
      <OrderReviewItem
        label="Order Date"
        node={
          order.created_at ? (
            <time>{dateFormat(order.created_at, 'H:mm, dd MMM, yyyy')}</time>
          ) : null
        }
      />
      <Divider />
      <OrderReviewDetails order={order} />
      <OrderReviewPayments payment={order.payments[0]} />
      <OrderReviewItems order={order} />
      <OrderReviewTotal order={order} />
    </Fragment>
  );
};
