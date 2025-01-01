import type { Currency } from 'react-shop-types';
import { useCartProvider } from './../cart/useCartProvider';
import { DEFAULT_CURRENCY_CODE } from 'src/constants';

export const useCurrency = (): Currency['code'] => {
  const { cart } = useCartProvider();

  return cart?.region?.currency_code || DEFAULT_CURRENCY_CODE;
};
