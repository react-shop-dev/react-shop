'use client';

import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useCheckoutContext, useNotify } from 'react-shop';
import { PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import type { StripePaymentRequestButtonElementOptions } from '@stripe/stripe-js';
import isFunction from 'lodash/isFunction';
import { useRequestPayment } from '../hooks/useRequestPayment';
import { usePaymentConfirm } from '../hooks/usePaymentConfirm';

export type StripePaymentRequestButtonProps = Omit<
  StripePaymentRequestButtonElementOptions,
  'paymentRequest'
> & {
  fallback?: ReactElement;
  errorComponent?: ReactElement;
  handleClick?: () => void;
  notAvailable?: ReactNode;
};

export const StripePaymentRequestButton = (props: StripePaymentRequestButtonProps) => {
  const {
    fallback,
    errorComponent,
    handleClick,
    notAvailable = <NotAvailable />,
    ...options
  } = props;

  const { paymentRequest, loading, error } = useRequestPayment();
  const handlePayment = usePaymentConfirm();
  const { onPlaceOrderError } = useCheckoutContext();
  const notify = useNotify();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!paymentRequest) {
      return;
    }
    paymentRequest.on('paymentmethod', async event => {
      try {
        handlePayment(event);
      } catch (error) {
        onPlaceOrderError(error);
      } finally {
        setSubmitted(true);
      }
    });
    () => {
      paymentRequest.off('paymentmethod');
    };
  }, [paymentRequest, handlePayment, onPlaceOrderError]);

  if (loading) {
    return fallback || <>Loading ◌ </>;
  }

  if (error) {
    return errorComponent || <>Payment request error</>;
  }

  return paymentRequest ? (
    <PaymentRequestButtonElement
      options={{ ...options, paymentRequest }}
      onClick={event => {
        if (isFunction(handleClick)) {
          handleClick();
        }
        if (submitted) {
          event.preventDefault();
          notify('Refresh the page to use the PaymentRequest button', { type: 'info' });
        }
      }}
    />
  ) : (
    notAvailable
  );
};

const NotAvailable = () => <div>Payment request button is not available in your browser.</div>;
