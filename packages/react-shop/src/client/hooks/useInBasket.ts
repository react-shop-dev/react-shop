import { useMemo } from 'react';
import type { Identifier } from 'react-shop-types';
import { useCartProvider } from '../cart';

export const useInBasket = (id: Identifier) => {
  const { data: cartItems } = useCartProvider();

  return useMemo(() => cartItems?.find(item => item.id === id), [cartItems]);
};
