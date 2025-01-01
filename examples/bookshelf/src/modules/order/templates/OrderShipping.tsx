import { Fragment } from 'react';
import { usePrice } from 'react-shop';
import type { Address, ShippingMethod } from 'react-shop-types';
import Typography from '@mui/material/Typography';
import OrderTitle from '../components/OrderTitle';

export const OrderShipping = (props: OrderShippingProps) => {
  const formatPrice = usePrice();
  const { contact, address, method } = props;

  return (
    <Fragment>
      <OrderTitle>Contact</OrderTitle>
      <Typography component="p" gutterBottom>
        {contact}
      </Typography>
      <OrderTitle>Shipping</OrderTitle>
      <Typography component="p" gutterBottom>
        {`${method?.shipping_option.name} (${formatPrice(Number(method?.price))})`}
      </Typography>
      <OrderTitle>Address</OrderTitle>
      <Typography component="p" gutterBottom>
        {address?.country_code}
        <br /> {address?.province}
        <br /> {address?.city}
        <br /> {address?.address_1}
        <br /> {address?.address_2}
      </Typography>
    </Fragment>
  );
};

type OrderShippingProps = {
  contact?: string | null;
  address?: Address;
  method?: ShippingMethod;
};
