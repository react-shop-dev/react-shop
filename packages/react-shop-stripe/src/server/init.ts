import Stripe from 'stripe';

export const initStripe = (secretKey: string) =>
  new Stripe(secretKey, {
    apiVersion: '2024-04-10',
    typescript: true,
  });
