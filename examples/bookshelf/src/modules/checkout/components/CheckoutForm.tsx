'use client';

import type { ReactNode } from 'react';
import { Form, useCheckoutContext, type FormProps } from 'react-shop';
import { PAYMENTS } from '@/lib/constants';

const CheckoutForm = ({
  children,
  payment,
  defaultValues,
  ...rest
}: { children: ReactNode; payment?: string } & FormProps) => {
  const { onPlaceOrder, readyToPay } = useCheckoutContext();

  const isManual = payment === PAYMENTS.MANUAL;

  const handleSubmit = async (formData: Record<string, any>) => {
    if (!readyToPay) {
      return;
    }
    onPlaceOrder({
      payment_id: PAYMENTS.MANUAL,
      billing_details: formData,
    });
  };

  return (
    <Form
      onSubmit={isManual ? handleSubmit : undefined}
      noValidate
      defaultValues={defaultValues}
      {...rest}
    >
      {children}
    </Form>
  );
};

export default CheckoutForm;
