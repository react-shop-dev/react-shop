'use client';

import { useState, useEffect } from 'react';
import { useLineItemInterface, useCurrency, useCartProvider, useCheckoutContext } from 'react-shop';
import type { LineItem } from 'react-shop-types';
import get from 'lodash/get';
import { useStripe } from '@stripe/react-stripe-js';
import type { PaymentRequest } from '@stripe/stripe-js';
import { COUNTRIES, DEFAULT_COUNTRY } from '../../constants';
import { logError } from '../../utils';
import { useStripeContext } from '../providers/useStripeContext';

export const useRequestPayment = (): UseRequestPaymentReturn => {
  const stripe = useStripe();
  const { cart, data: lineItems } = useCartProvider();
  const currency = useCurrency();
  const { readyToCheckout } = useCheckoutContext();

  const { price: priceKey, title: titleKey } = useLineItemInterface();
  const { country } = useStripeContext();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const initializePaymentRequest = async () => {
    try {
      const paymentRequest = stripe!.paymentRequest({
        country: getCountry(country?.toUpperCase()),
        currency,
        displayItems: convertToDisplayItems(lineItems, titleKey, priceKey),
        total: {
          label: 'Total amount',
          amount: Number(cart.total),
        },
      });

      const canMakePaymentRes = await paymentRequest.canMakePayment();
      if (canMakePaymentRes) {
        setPaymentRequest(paymentRequest);
      } else {
        setPaymentRequest(null);
      }
    } catch (error: unknown) {
      logError('Cannot create paymentRequest', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stripe && readyToCheckout) {
      initializePaymentRequest();
    }
  }, [stripe, readyToCheckout]);

  return { paymentRequest, loading, error };
};

type UseRequestPaymentReturn = {
  paymentRequest: PaymentRequest | null;
  error: unknown | null;
  loading: boolean;
};

const getCountry = (country: string = DEFAULT_COUNTRY) => {
  if (COUNTRIES.includes(country)) {
    return country;
  } else {
    logError('Your country is not supported by stripe', undefined, 'warn');
    return DEFAULT_COUNTRY;
  }
};

const convertToDisplayItems = (cartItems: LineItem[] | null, titleKey: string, priceKey: string) =>
  cartItems?.map(item => ({
    label: get(item, titleKey),
    amount: get(item, priceKey),
  }));
