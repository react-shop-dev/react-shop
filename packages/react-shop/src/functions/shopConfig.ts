import merge from 'lodash/merge';
import { isBrowser } from './isBrowser';
import { ShopConfig } from '@type/config';

export const getShopConfig = (): ShopConfig =>
  !isBrowser() ? (globalThis as any).__REACT_SHOP__ : window.__REACT_SHOP__ || {};

export const setShopConfig = (newConfig: Partial<ShopConfig>) => {
  const config = getShopConfig();
  const updatedConfig = merge(config, newConfig);

  if (isBrowser()) {
    window.__REACT_SHOP__ = updatedConfig;
  } else {
    (globalThis as any).__REACT_SHOP__ = updatedConfig;
  }
};
