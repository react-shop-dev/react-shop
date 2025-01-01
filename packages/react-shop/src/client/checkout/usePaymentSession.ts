import { useEffect, useMemo, useState } from 'react';
import { Cart } from 'react-shop-types';
import uniqueId from 'lodash/uniqueId';
import { useCartProvider, useRegion } from '../cart';

export const usePaymentSession = (): UsePaymentSessionReturn => {
  const region = useRegion();
  const [error, setError] = useState<unknown | null>(null);
  const { cart, updateCart } = useCartProvider();

  const paymentSessions: Cart['payment_sessions'] = useMemo(
    () =>
      region.payment_providers
        ?.filter(provider => provider.is_installed)
        .map(provider => ({
          id: `ps_${uniqueId()}`,
          cart_id: cart.id,
          provider_id: provider.id,
          data: {},
          is_selected: null,
          is_initiated: false,
          status: 'pending',
          amount: cart.total,
          created_at: new Date(),
          updated_at: new Date(),
          payment_authorized_at: null,
        })),
    [region, cart.id],
  );

  useEffect(() => {
    if (!cart.id) {
      return;
    }
    try {
      updateCart({
        cartId: cart?.id,
        data: {
          idempontency_key: cart?.idempontency_key,
          payment_sessions: paymentSessions,
        },
      });
    } catch (error: unknown) {
      console.error('CheckoutProvider: create payment sessions error', error);
      setError(error);
    }
  }, [cart.id]);

  const createPaymentSession = async (providerId: string, paymentIntent: any) => {
    if (!paymentIntent) {
      console.error('CheckoutProvider: creating payment intent is required to payment process');
      return;
    }
    const payment_sessions = paymentSessions || [];
    const index = payment_sessions.findIndex(session => session.provider_id === providerId);
    if (index === -1) {
      return;
    }

    const newPaymentSession: Cart['payment_session'] = {
      ...payment_sessions[index],
      data: paymentIntent,
      updated_at: new Date(),
      is_initiated: true,
      is_selected: true,
    };

    payment_sessions[index] = newPaymentSession;

    try {
      updateCart({
        cartId: cart?.id,
        data: {
          idempontency_key: cart.idempontency_key,
          payment_session: newPaymentSession,
          payment_sessions: paymentSessions,
        },
      });
    } catch (error: unknown) {
      console.error('CheckoutProvider: create payment session error', error);
      setError(error);
    }
  };

  return { createPaymentSession, error };
};

export type CreatePaymentSession = (providerId: string, paymentIntent: unknown) => void;

export type UsePaymentSessionReturn = {
  createPaymentSession: CreatePaymentSession;
  error: unknown | null;
};
