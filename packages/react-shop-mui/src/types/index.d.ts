import { FC } from 'react';
import {
  CardExpiryElementProps,
  CardNumberElementProps,
  CardCvcElementProps,
  StripeElementType,
} from '@stripe/react-stripe-js';
import {
  StripeCardCvcElementChangeEvent,
  StripeCardCvcElementOptions,
  StripeCardExpiryElementChangeEvent,
  StripeCardExpiryElementOptions,
  StripeCardNumberElementChangeEvent,
  StripeCardNumberElementOptions,
} from '@stripe/stripe-js';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';

export type PaymentInputElement =
  | FC<CardExpiryElementProps>
  | FC<CardNumberElementProps>
  | FC<CardCvcElementProps>;

export interface PaymentInputProps extends OutlinedInputProps {
  options?: StripeCardElementOptions;
  component: PaymentInputElement;
  elementType: StripeElementType;
}

export type PaymentInputEvent =
  | StripeCardExpiryElementChangeEvent
  | StripeCardNumberElementChangeEvent
  | StripeCardCvcElementChangeEvent;

type StripeCardElementOptions =
  | StripeCardCvcElementOptions
  | StripeCardExpiryElementOptions
  | StripeCardNumberElementOptions;

export const PaymentInput: FC<PaymentInputProps>;
