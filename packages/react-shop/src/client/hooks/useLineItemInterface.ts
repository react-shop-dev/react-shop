import { useMemo } from 'react';
import { useShopConfig } from '../shop';
import type { ShopConfig } from '@type/config';

export const useLineItemInterface = (): ShopConfig['lineItem'] => {
  const config = useShopConfig();

  const lineItemInterface = useMemo(() => config?.lineItem, [config?.lineItem]);

  if (!lineItemInterface) {
    throw new Error('Line Item interface is required!');
  }

  return lineItemInterface;
};
