import { useContext } from 'react';
import { CheckoutContext, CheckoutContextResult } from './CheckoutContext';

export const useCheckoutContext = (): CheckoutContextResult => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckoutContext must be used within a CheckoutProvider');
  }
  return context;
};
