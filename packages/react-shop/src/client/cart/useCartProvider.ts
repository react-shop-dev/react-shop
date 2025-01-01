import { useContext } from 'react';
import { CartContext, CartContextProps } from './CartContext';

export const useCartProvider = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartProvider must be used within a CartContext');
  }
  return context;
};
