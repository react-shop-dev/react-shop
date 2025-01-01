'use client';

import { useCartProvider } from 'react-shop';
import { PaymentButton } from 'react-shop-mui/PaymentButton';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import { PAYMENTS } from '@/lib/constants';
import { StripePaymentButton } from './StripePaymentButton';

const CheckoutPaymentButton = () => {
  const { cart: { payment_session } = {}, isFetching, error } = useCartProvider();

  if (isFetching) {
    return <Skeleton width="100%" height={40} />;
  }

  if (error) {
    return <Alert severity="error">Something went wrong</Alert>;
  }

  switch (payment_session?.provider_id) {
    case PAYMENTS.STRIPE:
      return <StripePaymentButton />;
    default:
      return <PaymentButton />;
  }
};

export default CheckoutPaymentButton;
