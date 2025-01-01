import type { ComponentType, ReactNode } from 'react';
import { createPaymentIntent } from './createPaymentIntent';
import { StripeProviderProps } from 'src/client';

export type ShopStripeProps = {
  publishableKey: string;
  secretKey: string;
  country?: string;
  provider: ComponentType<StripeProviderProps>;
  children: ReactNode;
};

export const ShopStripe = ({
  provider: Provider,
  publishableKey,
  secretKey,
  country,
  children,
}: ShopStripeProps) => {
  if (!secretKey) {
    throw new Error('Stripe secret key is not set. Please provide it as a prop `secretKey`.');
  }
  if (!publishableKey) {
    throw new Error(
      'Stripe publishable key is not set. Please provide it as a prop `publishableKey`.',
    );
  }

  const createPaymentIntentWithKey = createPaymentIntent.bind(null, secretKey);

  return (
    <Provider
      publishableKey={publishableKey}
      createPaymentIntent={createPaymentIntentWithKey}
      country={country}
    >
      {children}
    </Provider>
  );
};
