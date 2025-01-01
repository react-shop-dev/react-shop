'use client';

import { ReactNode } from 'react';
import { StripeContext, StripeContextProps } from './StripeContext';

export type StripeProviderProps = StripeContextProps & {
  children: ReactNode;
};

export const StripeProvider = ({ children, ...value }: StripeProviderProps) => {
  return <StripeContext.Provider value={{ ...value }}>{children}</StripeContext.Provider>;
};
