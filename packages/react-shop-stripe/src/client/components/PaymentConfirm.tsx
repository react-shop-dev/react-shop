'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { SaveContextProvider, TransformData, useCheckoutContext, useNotify } from 'react-shop';
import { useElements } from '@stripe/react-stripe-js';
import type { PaymentMethodCreateParams } from '@stripe/stripe-js';
import merge from 'lodash/merge';
import { usePaymentConfirm } from '../hooks/usePaymentConfirm';

type PaymentFormData = PaymentMethodCreateParams.BillingDetails;

export const PaymentConfirm = ({ children }: { children: ReactNode }) => {
  const [saving, setSaving] = useState(false);
  const handlePayment = usePaymentConfirm();
  const { onPlaceOrderError } = useCheckoutContext();
  const notify = useNotify();
  const elements = useElements();

  const extractBillingDetails = async (formData: PaymentFormData) => {
    const addressElement = elements?.getElement('address');
    let billingDetails = formData;

    if (addressElement) {
      const { complete, value: addressValue } = await addressElement.getValue();
      if (!complete) {
        notify('Please fill shipping address fields ', { type: 'error' });
      }
      billingDetails = addressValue;
    }

    const { name, phone, address: { country, ...addressData } = {} } = billingDetails;
    return merge(addressElement ? formData : {}, {
      name: name || 'Guest',
      phone,
      address: {
        ...(country ? { country } : {}),
        ...addressData,
      },
    });
  };

  const handlePamentConfirm = async (
    formData: Record<string, any> = {},
    options: { transform?: TransformData },
  ) => {
    let data = formData;
    if (options.transform) {
      data = options.transform(formData);
    }
    try {
      setSaving(true);
      const billingDetails = await extractBillingDetails(data);
      handlePayment(billingDetails);
    } catch (error) {
      onPlaceOrderError(error);
    } finally {
      setSaving(false);
    }
  };

  const saveContext = {
    save: handlePamentConfirm,
    saving,
  };

  return <SaveContextProvider value={saveContext}>{children}</SaveContextProvider>;
};
