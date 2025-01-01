import { UseUpdateOptions } from '@data/mutate';
import { createContext } from 'react';
import type { Product, Cart, LineItem, Identifier } from 'react-shop-types';

export type AddToCartPayload = {
  variantId: Identifier;
  cartId?: Cart['id'];
  quantity?: number;
  item?: Product;
};

export type RemoveFromCartPayload = {
  lineId: Identifier;
  cartId?: Cart['id'];
};

export type UpdateItemPayload = {
  lineId: Identifier;
  cartId?: Cart['id'];
  quantity?: number;
};

export type UpdateCartPayload = {
  cartId?: Cart['id'];
  data: any;
  options?: UseUpdateOptions;
};

export interface CartContextProps {
  cart: Cart | Omit<Cart, 'items'>;
  data: LineItem[] | null;
  itemsTotal: number;
  updateCart: (payload: UpdateCartPayload) => void;
  addItem: (payload: AddToCartPayload) => void;
  updateItem: (payload: UpdateItemPayload) => void;
  removeItem: (payload: RemoveFromCartPayload) => void;
  completeCart: (cartId?: Cart['id']) => void;
  error?: unknown;
  isFetching?: boolean;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

CartContext.displayName = 'ShopCartContext';
