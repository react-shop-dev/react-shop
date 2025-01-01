'use client';

import { useShowContext } from 'react-shop';
import type { Order } from 'react-shop-types';
import { OrderTopbar } from '@/modules/order/components/OrderTopbar';
import { OrderShipping } from '@/modules/order/templates/OrderShipping';
import { OrderSummary } from '@/modules/order/templates/OrderSummary';
import LineItems from '../common/LineItems';
import { OrderShowPlaceholder } from './skeletons/OrderShowPlaceholder';
import { OrderShowLayout } from './templates/OrderShowLayout';

export const OrderShow = () => {
  const { record: order, error, isPending } = useShowContext<Order>();

  if (isPending) {
    return <OrderShowPlaceholder />;
  }

  if (error) {
    return <>Order not found</>;
  }

  return (
    <OrderShowLayout
      id={order.display_id}
      title="Order Details"
      topbar={
        <OrderTopbar
          created_at={order?.created_at}
          status={order?.status}
          payment_status={order?.payment_status}
        />
      }
      items={<LineItems data={order?.items} inAccount />}
    >
      <OrderShipping
        contact={order?.email}
        address={order?.shipping_address}
        method={order?.shipping_methods[0]}
      />
      <OrderSummary
        total={order?.total}
        subtotal={order?.subtotal}
        shipping_total={order?.shipping_total}
        tax_total={order?.tax_total}
      />
    </OrderShowLayout>
  );
};
