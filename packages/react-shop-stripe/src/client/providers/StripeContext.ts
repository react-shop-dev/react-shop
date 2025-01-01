'use client';

import { createContext } from 'react';
import type { CreatePaymentIntent } from 'src/types';

export interface StripeContextProps {
  country?: string;
  publishableKey: string;
  createPaymentIntent: CreatePaymentIntent;
}

export const StripeContext = createContext<StripeContextProps | null>(null);

StripeContext.displayName = 'StripeContext';
