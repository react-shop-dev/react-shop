'use client';

import { PaymentButton, type PaymentButtonProps } from 'react-shop-mui/PaymentButton';
import { useElements } from '@stripe/react-stripe-js';

const transformDataForStripe = (data: Record<string, any>) => ({
  emai: data.email,
  phone: data.phone,
  name: `${data.first_name} ${data.last_name}`,
  address: {
    city: data.address.city,
    postal_code: data.address.postal_code,
    country: data.address?.country_code,
    line1: data.address?.address_1,
  },
});

export const StripePaymentButton = (props: PaymentButtonProps) => {
  const elements = useElements();
  const cardNumber = elements?.getElement('cardNumber');

  return (
    <PaymentButton
      type="button"
      checkCardComplete={!!cardNumber}
      transform={transformDataForStripe}
      {...props}
    />
  );
};
