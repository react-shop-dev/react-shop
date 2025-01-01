import { ReactNode, useMemo } from 'react';
import { CheckoutContext } from './CheckoutContext';
import { useCartProvider } from '../cart/useCartProvider';
import { usePaymentSession } from './usePaymentSession';
import { useOrderPlace, type UseOrderPlaceParams } from './useOrderPlace';

export type CheckoutProviderProps = UseOrderPlaceParams & {
  children: ReactNode;
};

export const CheckoutProvider = (options: CheckoutProviderProps) => {
  const { children, ...rest } = options;

  const { cart, data: lineItems, error, isFetching } = useCartProvider();
  const { createPaymentSession } = usePaymentSession();

  const [onPlaceOrder, onPlaceOrderError] = useOrderPlace({ ...rest });

  const readyToCheckout = useMemo(
    () =>
      !!cart.id &&
      !!cart.payment_sessions &&
      cart.payment_sessions.length > 0 &&
      !!lineItems &&
      lineItems.length > 0 &&
      +cart?.total > 0,
    [cart.id, lineItems, cart.total, cart.payment_sessions],
  );

  const readyToPay = useMemo(
    () => !!cart?.payment_session && cart?.shipping_methods?.length > 0,
    [cart?.payment_session, cart?.shipping_methods],
  );

  return (
    <CheckoutContext.Provider
      value={{
        readyToCheckout,
        readyToPay,
        createPaymentSession,
        onPlaceOrder,
        onPlaceOrderError,
        isPending: isFetching,
        error,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
