'use client';

import type { ListViewParams } from 'react-shop';
import type { Order } from 'react-shop-types';
import { AccountListPlaceholder } from '../../account/skeletons/AccountListPlaceholder';
import { OrderListItem } from '../components/OrderListItem';

const OrdersList = ({ data = [], isPending, error }: Partial<ListViewParams>) => {
  if (isPending) {
    return <AccountListPlaceholder />;
  }

  if (error) {
    return null;
  }

  return data.length
    ? data.map((order: Order) => <OrderListItem key={order.id} order={order} />)
    : null;
};

export default OrdersList;
