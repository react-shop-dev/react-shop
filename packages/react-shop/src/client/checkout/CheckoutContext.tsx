import { createContext } from 'react';
import type { OnPlaceOrder, OnPlaceOrderError } from './useOrderPlace';
import type { CreatePaymentSession } from './usePaymentSession';

export interface CheckoutContextResult {
  readyToCheckout: boolean;
  readyToPay: boolean;
  createPaymentSession: CreatePaymentSession;
  onPlaceOrder: OnPlaceOrder;
  onPlaceOrderError: OnPlaceOrderError;
  isPending?: boolean;
  error?: unknown;
}

export const CheckoutContext = createContext<CheckoutContextResult | null>(null);

CheckoutContext.displayName = 'CheckoutContext';
