import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product, ProductVariant } from 'react-shop-types';
import { useRecordContext } from '@core/useRecordContext';

export const useProductVariant = (paramsKey = 'v'): ProductVariant | undefined => {
  const product = useRecordContext<Product>();
  const searchParams = useSearchParams();

  const variantId = searchParams.get(paramsKey);
  const variants = product?.variants || [];

  const variant = useMemo(() => {
    return variants.find(v => v.id === variantId);
  }, [variantId, variants]);

  return variant || variants[0];
};
