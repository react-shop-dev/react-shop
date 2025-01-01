import { PriceField } from 'react-shop-mui/PriceField';
import { ReferenceField } from 'react-shop-mui/ReferenceField';
import { TextField } from 'react-shop-mui/TextField';
import type { Order } from 'react-shop-types';
import Typography from '@mui/material/Typography';
import { AccountListItem } from '@/modules/account/components/AccountListItem';
import { format as formatDate } from 'date-fns';
import { OrderStatus } from './OrderStatus';
import OrderTitle from './OrderTitle';

export const OrderListItem = ({ order }: { order: Order }) => (
  <AccountListItem link={`orders/${order.id}`}>
    <OrderTitle># {order.display_id}</OrderTitle>
    <ReferenceField record={order} source="customer_id" reference="customers">
      <TextField source="email" />
    </ReferenceField>
    <OrderStatus status={order.status} />
    {order.created_at ? (
      <Typography component="time">{formatDate(order.created_at, 'MMM dd, yyyy')}</Typography>
    ) : null}
    <PriceField value={order.total} textAlign="center" />
  </AccountListItem>
);
