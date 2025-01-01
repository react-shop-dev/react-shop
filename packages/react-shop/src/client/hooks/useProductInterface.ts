import { useMemo } from 'react';
import { useShopConfig } from '../shop';
import type { ShopConfig } from '@type/config';

export const useProductInterface = (): ShopConfig['product'] => {
  const config = useShopConfig();

  const productInterface = useMemo(() => config?.product, [config?.product]);

  if (!productInterface) {
    throw new Error('Product interface is required!');
  }

  return productInterface;
};
