'use client';

import { Fragment } from 'react';
import { useCartProvider, useIsLoaded } from 'react-shop';
import { PaymentInput } from 'react-shop-mui/PaymentInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useColorScheme } from '@mui/material/styles';
import { PAYMENTS } from '@/lib/constants';
import { SvgIcon } from '@/modules/common/SvgIcon';
import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { InputHolder } from '../../common/InputHolder';
import CardLayoutPlaceholder from '../skeletons/CardLayoutPlaceholder';

const StripeCard = () => {
  const { cart: { payment_session } = {}, isFetching } = useCartProvider();
  const isLoaded = useIsLoaded(isFetching);
  const { mode } = useColorScheme();

  if (!isLoaded) {
    return <CardLayoutPlaceholder />;
  }

  if (payment_session?.provider_id !== PAYMENTS.STRIPE) {
    return null;
  }

  return (
    <Fragment>
      <InputHolder gridColumn={6}>
        <PaymentInput
          label="rs.field.cardNumber"
          elementType="cardNumber"
          component={CardNumberElement}
          options={{ showIcon: true }}
        />
      </InputHolder>
      <InputHolder gridColumn={3}>
        <PaymentInput
          label="rs.field.expirationDate"
          elementType="cardExpiry"
          component={CardExpiryElement}
        />
      </InputHolder>
      <InputHolder gridColumn={3}>
        <PaymentInput
          label="CVC code"
          elementType="cardCvc"
          component={CardCvcElement}
          endAdornment={
            <InputAdornment position="end">
              <SvgIcon
                width="25"
                height="25"
                name="Payment"
                id="cvc"
                {...(mode === 'dark' ? { fill: 'white' } : {})}
              />
            </InputAdornment>
          }
        />
      </InputHolder>
    </Fragment>
  );
};

export default StripeCard;
