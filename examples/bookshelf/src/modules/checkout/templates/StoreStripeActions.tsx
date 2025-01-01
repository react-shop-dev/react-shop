'use client';

import { useCheckoutContext } from 'react-shop';
import { StripeExpressCheckoutElement, StripePaymentRequestButton } from 'react-shop-stripe';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

type StripeActionsProps = { element?: 'express' | 'payment' };

const StoreStripeActions = ({ element = 'express' }: StripeActionsProps) => {
  const { readyToPay } = useCheckoutContext();

  if (!readyToPay) {
    return null;
  }

  const renderPaymentElement = () =>
    element === 'express' ? (
      <StripeExpressCheckoutElement fallback={<Fallback />} />
    ) : element === 'payment' ? (
      <StripePaymentRequestButton fallback={<Fallback />} />
    ) : null;

  return <Box sx={{ my: 2 }}>{renderPaymentElement()}</Box>;
};

const Fallback = () => <Skeleton width="100%" height={42} />;

export default StoreStripeActions;
