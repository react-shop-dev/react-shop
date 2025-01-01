import { useMemo } from 'react';
import type { Product, ProductVariant } from 'react-shop-types';
import { useRecordContext } from '@core/useRecordContext';

export const useInStock = (data?: ProductVariant[]): boolean => {
  const product = useRecordContext<Product>();

  const variants = data || product?.variants || [];

  return useMemo(() => {
    return variants.some(variant => {
      // If we don't manage inventory, we can always add to cart
      if (!variant.manage_inventory) {
        return true;
      }
      // If we allow back orders on the variant, we can add to cart
      if (variant.allow_backorder) {
        return true;
      }
      // If there is inventory available, we can add to cart
      if (variant.inventory_quantity && variant.inventory_quantity > 0) {
        return true;
      }
      return false;
    });
  }, [variants]);
};
