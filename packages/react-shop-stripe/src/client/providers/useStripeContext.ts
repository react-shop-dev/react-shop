'use client';

import { useContext } from 'react';
import { StripeContext, type StripeContextProps } from './StripeContext';

export const useStripeContext = (): StripeContextProps => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripeContext must be used within a StripeContext');
  }
  return context;
};
