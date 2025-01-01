import type { ReactNode } from 'react';
import { StripeAdapter } from 'react-shop-stripe';
import { PAYMENTS } from '@/lib/constants';
import { ErrorPaymentIntent } from './components/ErrorPaymentIntent';

const StorePaymentAdapter = ({ children, payment }: { children: ReactNode; payment?: string }) => {
  if (payment === PAYMENTS.STRIPE) {
    return (
      <StripeAdapter mode="payment" errorElement={ErrorPaymentIntent}>
        {children}
      </StripeAdapter>
    );
  }
  return <>{children}</>;
};

export default StorePaymentAdapter;
