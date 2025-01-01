import type { ComponentType, ReactNode } from 'react';
import type { StripeElementsOptions } from '@stripe/stripe-js';

export type CreatePaymentIntentParams = {
  idempotencyKey: string;
  amount: number;
  currency: string;
};

export type PaymentIntentError = {
  type: string;
  statusCode: number;
  message: string;
  logUrl?: string;
};

export type CreatePaymentIntentActionResult = Promise<string | { error: unknown }>;

export type CreatePaymentIntent = (
  params: CreatePaymentIntentParams,
) => CreatePaymentIntentActionResult;

export type StripeAdapterProps = StripeElementsOptions & {
  children: ReactNode;
  country?: string;
  publishableKey: string;
  fallback?: ReactNode;
  errorElement?: ComponentType<PaymentIntentError>;
  createPaymentIntent: CreatePaymentIntent;
};
