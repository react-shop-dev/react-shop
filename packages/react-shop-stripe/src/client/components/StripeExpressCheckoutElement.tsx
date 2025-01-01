import { isValidElement, Fragment, type ReactNode, useState, ComponentType } from 'react';
import { useCheckoutContext, useNotify } from 'react-shop';
import isFunction from 'lodash/isFunction';
import { ExpressCheckoutElement, type ExpressCheckoutElementProps } from '@stripe/react-stripe-js';
import type {
  StripeError,
  StripeExpressCheckoutElementClickEvent,
  StripeExpressCheckoutElementConfirmEvent,
  StripeExpressCheckoutElementReadyEvent,
} from '@stripe/stripe-js';
import { usePaymentConfirm } from '../hooks/usePaymentConfirm';
import { logError } from 'src/utils';

export type StripeExpressCheckoutElementProps = Omit<ExpressCheckoutElementProps, 'onConfirm'> & {
  fallback?: ReactNode;
  errorElement?: ComponentType<StripeError>;
};

export const StripeExpressCheckoutElement = ({
  fallback,
  onCancel: onCancelProp,
  errorElement: ErrorElement = DefaultErrorElement,
  ...rest
}: StripeExpressCheckoutElementProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<StripeError | null>(null);
  const handlePayment = usePaymentConfirm();
  const { onPlaceOrderError } = useCheckoutContext();
  const notify = useNotify();

  const onReady = ({ availablePaymentMethods }: StripeExpressCheckoutElementReadyEvent) => {
    if (!availablePaymentMethods) {
      notify('Enable payment methods on dashboard', { type: 'warning' });
    }
    setReady(true);
  };

  const onClick = ({ resolve }: StripeExpressCheckoutElementClickEvent) => {
    const options = {
      emailRequired: true,
    };
    resolve(options);
  };

  const onConfirm = (event: StripeExpressCheckoutElementConfirmEvent) => {
    try {
      handlePayment(event);
    } catch (error) {
      logError('express checkout error', error);
      onPlaceOrderError(error);
    }
  };

  const onCancel = (event: { elementType: 'expressCheckout' }) => {
    if (isFunction(onCancelProp)) {
      onCancelProp(event);
    }
    notify('Payment interface is dismissed', { type: 'warning' });
  };

  const onLoadError = (event: { elementType: 'expressCheckout'; error: StripeError }) => {
    setError(event.error);
  };

  const renderFallback = () =>
    !ready ? isValidElement(fallback) ? fallback : <>Loading...</> : null;

  if (error) {
    return <ErrorElement {...error} />;
  }

  return (
    <Fragment>
      {renderFallback()}
      <ExpressCheckoutElement
        onClick={onClick}
        onReady={onReady}
        onConfirm={onConfirm}
        onLoadError={onLoadError}
        onCancel={onCancel}
        {...rest}
      />
    </Fragment>
  );
};

const DefaultErrorElement = (error: StripeError) => (
  <div style={{ color: 'var(--shop-palette-error-main)' }}>{error.message}</div>
);
