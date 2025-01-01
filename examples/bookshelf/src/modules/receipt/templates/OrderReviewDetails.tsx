import { Fragment } from 'react';
import { usePrice } from 'react-shop';
import { FlexBox } from 'react-shop-mui/FlexBox';
import type { Order } from 'react-shop-types';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Divider from '@mui/material/Divider';
import OrderTitle from '@/modules/order/components/OrderTitle';
import OrderReviewItem from '../components/OrderReviewtem';

export const OrderReviewDetails = ({ order }: { order: Order }) => {
  const formatPrice = usePrice();

  const name = [order?.customer?.first_name, order?.customer?.last_name].filter(Boolean).join(' ');

  const address = [
    order?.shipping_address?.country_code,
    order?.shipping_address?.city,
    order?.shipping_address?.address_1,
  ]
    .filter(Boolean)
    .join(', ');

  const shippingMethod = `${order?.shipping_methods[0].shipping_option.name} (${formatPrice(order?.shipping_methods[0].price)})`;

  return (
    <Fragment>
      <OrderTitle>Details</OrderTitle>
      <OrderReviewItem
        label="Name"
        node={<span style={{ textTransform: 'capitalize' }}>{name}</span>}
      />
      <OrderReviewItem
        label="Email"
        node={order?.email}
        icon={<MailOutlineIcon fontSize="small" />}
      />
      <FlexBox justifyContent="space-between">
        <OrderReviewItem label="Address" node={address} direction="column" />
        <OrderReviewItem
          label={<span style={{ display: 'block', textAlign: 'right' }}>Shipping</span>}
          node={shippingMethod}
          direction="column"
        />
      </FlexBox>
      <Divider />
    </Fragment>
  );
};
