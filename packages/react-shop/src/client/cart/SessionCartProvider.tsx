import { useCallback, useMemo } from 'react';
import omit from 'lodash/omit';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import type { LineItem, Identifier, Product, ProductVariant } from 'react-shop-types';
import { produce } from '@functions/produce';
import { useLineItemInterface } from '@hooks/useLineItemInterface';
import {
  AddToCartPayload,
  RemoveFromCartPayload,
  UpdateCartPayload,
  UpdateItemPayload,
} from './CartContext';
import type { LineItems } from '@type/lib';
import type { CartAdapterComponentProps } from './CartProvider';
import { DefaultCart, defaultCart } from './defaultCart';
import { useGetIdentity } from '../auth';
import { DEFAULT_CART_ID } from 'src/constants';

export const SessionCartProvider = (props: CartAdapterComponentProps) => {
  const { session, region: regionProp, children } = props;

  const { price: priceKey, quantity: quantityKey } = useLineItemInterface();
  const { identity } = useGetIdentity();
  const sessionCart = session?.data?.cart;
  const items = get(sessionCart, 'items', emptyCart as LineItems);

  const cartItems = useMemo(() => (items ? Object.values(items) : []), [items, session?.data?.id]);

  const updateCart = ({ cartId, data, options }: UpdateCartPayload) => {
    if (!cartId) {
      // Just for consistency, in case of SessionCartProvider only session id matters
      console.error('Missing Cart Id');
      return;
    }
    if (isEmpty(data)) {
      return session?.updateSession({
        cart: defaultCart(regionProp),
      });
    }
    const {
      items = sessionCart?.items,
      tax_total = sessionCart?.tax_total,
      shipping_total = sessionCart?.shipping_total,
      idempontency_key,
      ...newCartData
    } = data;
    const itemsArray = isObject(items) ? Object.values(items) : [];

    const subtotal = computeSubTotal(itemsArray);
    const total = computeTotal({ subtotal, shipping_total, tax_total });

    const updatedCart = {
      ...cart,
      ...newCartData,
      total,
      tax_total,
      shipping_total,
      subtotal: subtotal,
      items,
      idempontency_key: idempontency_key ?? `${Date.now()}`,
      customer_id: identity?.id ?? null,
      email: identity?.email ?? null,
    };

    session?.updateSession(
      {
        cart: updatedCart,
      },
      {
        mutationMode: 'optimistic',
        ...options,
      },
    );
  };

  const addItem = useCallback(
    ({ cartId = sessionCart?.id, variantId, quantity = 1, item: newRecord }: AddToCartPayload) => {
      if (!variantId) {
        console.error('Missing Variant Id');
        return;
      }
      const id = generateLineItemId(String(variantId));
      updateCart({
        cartId,
        data: {
          items: produce(items, draftCart => {
            const existingCartItem = items[id];
            draftCart[id] = existingCartItem
              ? {
                  ...existingCartItem,
                  [quantityKey]: existingCartItem.quantity + quantity,
                  updated_at: new Date(),
                }
              : createNewLineItem({
                  id,
                  product: newRecord!,
                  variant_id: variantId,
                  cart: sessionCart,
                });
          }),
        },
      });
    },
    [items, updateCart],
  );

  const updateItem = useCallback(
    ({ cartId = sessionCart?.id, lineId, quantity = 1 }: UpdateItemPayload) => {
      if (!lineId) {
        console.error('Missing Line Id');
        return;
      }
      updateCart({
        cartId,
        data: {
          items: produce(items, draftCart => {
            if (quantity === 0) {
              delete draftCart[lineId];
            } else {
              draftCart[lineId][quantityKey] = quantity;
            }
          }),
        },
      });
    },
    [items, updateCart],
  );

  const removeItem = useCallback(
    ({ cartId = sessionCart?.id, lineId }: RemoveFromCartPayload) => {
      if (!lineId) {
        console.error('Missing Line Id');
        return;
      }
      const { [lineId]: _deleted, ...rest } = items;
      updateCart({
        cartId,
        data: { items: { ...rest } },
      });
    },
    [items, updateCart],
  );

  const completeCart = useCallback((cartId = sessionCart?.id) => {
    updateCart({ cartId, data: emptyCart, options: { mutationMode: 'pessimistic' } });
  }, []);

  const computeSubTotal = (data: LineItem[] = []) =>
    data.length > 0
      ? data.reduce(
          (total, cartItem) => total + get(cartItem, quantityKey) * get(cartItem, priceKey),
          0,
        )
      : 0;

  const itemsTotal = useMemo(
    () =>
      cartItems.length > 0
        ? cartItems.reduce((total, cartItem) => total + get(cartItem, quantityKey), 0)
        : 0,
    [cartItems],
  );

  const cart = useMemo(() => omit(sessionCart, 'items'), [sessionCart]);

  return children({
    cart,
    data: cartItems,
    itemsTotal,
    updateCart,
    addItem,
    updateItem,
    removeItem,
    completeCart,
    error: session?.error,
    isFetching: session?.isFetching,
  });
};

const emptyCart = {};

const computeTotal = ({
  subtotal,
  tax_total,
  shipping_total,
}: {
  subtotal: number;
  tax_total: number;
  shipping_total: number;
}) => {
  let total = subtotal;
  if (isNumber(tax_total)) {
    total += tax_total;
  }
  if (isNumber(shipping_total)) {
    total += shipping_total;
  }
  return total;
};

const generateLineItemId = (inputId: string) => {
  return `item_${inputId
    .replace(/^variant_/, '')
    .split('')
    .reverse()
    .join('')}`;
};

const createNewLineItem = ({
  id,
  product,
  variant_id,
  cart,
}: {
  id: string;
  product: Product;
  variant_id: Identifier;
  cart?: DefaultCart;
}): LineItem => {
  const variant = product.variants?.find(v => v.id === variant_id);

  return {
    id,
    title: product.title,
    thumbnail: product.thumbnail,
    description: product.description,
    cart_id: cart?.id || DEFAULT_CART_ID,
    product_id: product.id,
    order_id: null,
    order_edit_id: null,
    original_item_id: null,
    is_return: false,
    should_merge: true,
    allow_discounts: product.discountable,
    has_shipping: false,
    variant_id,
    variant: variant as ProductVariant,
    unit_price: variant?.calculated_price || 0,
    quantity: 1,
    fulfilled_quantity: null,
    returned_quantity: null,
    shipped_quantity: null,
    sales_channel_id: cart?.sales_channel_id ?? null,
    sales_channel: cart?.sales_channel ?? null,
    created_at: new Date(),
    adjustments: [],
    tax_lines: [
      {
        rate: 0,
        name: 'default',
        code: 'default',
        item_id: id,
      },
    ],
    metadata: {},
  };
};
