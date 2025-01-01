'use client';

import { useEffect, isValidElement, useState, useTransition, useRef } from 'react';
import {
  useShopSession,
  useCheckoutContext,
  useCurrency,
  useLocale,
  useCartProvider,
} from 'react-shop';
import { safeJSONParse } from 'react-shop/functions';
import isNumber from 'lodash/isNumber';
import { type StripeElementLocale, loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentConfirm } from './components/PaymentConfirm';
import { useStripeContext } from './providers/useStripeContext';
import { getErrorResponse, logError } from '../utils';
import type { PaymentIntentError, StripeAdapterProps } from 'src/types';
import { PAYMENT_PROVIDER } from 'src/constants';

export const StripeAdapter = (props: StripeAdapterProps) => {
  const {
    mode,
    errorElement: ErrorElement = DefaultPaymentElement,
    fallback,
    children,
    ...options
  } = props;

  const { createPaymentIntent = noop, publishableKey } = useStripeContext();

  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [error, setError] = useState<PaymentIntentError | null>(null);
  const [pending, startTransition] = useTransition();

  const { cart: { total, payment_session } = {} } = useCartProvider();
  const { id: sessionId } = useShopSession();
  const { cart } = useCartProvider();
  const currency = useCurrency();
  const locale = useLocale();
  const idempontencyKey = cart?.idempontency_key;
  const clientSecret = payment_session?.data.client_secret;
  const totalRef = useRef(Number(total));

  const { createPaymentSession, readyToCheckout } = useCheckoutContext();

  const initPaymentSession = async () => {
    const response = await createPaymentIntent({
      idempotencyKey: `${sessionId}:${idempontencyKey}`,
      amount: Number(total),
      currency,
    });

    const paymentIntent = safeJSONParse(response);
    if (paymentIntent.error) {
      logError('Payment intent error', paymentIntent.error);
      setError(getErrorResponse(paymentIntent.error));
      return;
    }
    if (paymentIntent.id !== payment_session?.data.id) {
      createPaymentSession(PAYMENT_PROVIDER, paymentIntent);
    }
  };

  useEffect(() => {
    if (isNumber(total) && total > 0) {
      totalRef.current = total;
    }
  }, [total]);

  useEffect(() => {
    setStripePromise(loadStripe(publishableKey));
  }, [publishableKey]);

  useEffect(() => {
    if (readyToCheckout) {
      startTransition(() => {
        initPaymentSession();
      });
    }
  }, [readyToCheckout, idempontencyKey]);

  if (error) {
    return <ErrorElement {...error} />;
  }

  const renderFallback = () => (isValidElement(fallback) ? fallback : children);

  return (
    <Elements
      key={clientSecret}
      stripe={stripePromise}
      options={{
        mode,
        ...(!mode ? { clientSecret } : {}),
        ...(mode ? { amount: totalRef.current } : {}),
        ...(mode ? { currency } : {}),
        locale: locale as StripeElementLocale,
        ...options,
      }}
    >
      {pending ? renderFallback() : <PaymentConfirm>{children}</PaymentConfirm>}
    </Elements>
  );
};

const DefaultPaymentElement = () => (
  <div style={{ fontSize: '18px', color: 'var(--shop-palette-error-main)' }}>
    Payment Intent Error
  </div>
);

const noop = () => {};
