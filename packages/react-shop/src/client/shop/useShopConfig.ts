import { useContext } from 'react';
import defaultConfig from 'src/config/defaultConfig.json';
import { ShopConfigContext } from './ShopConfigContext';
import type { ShopConfig } from '@type/config';

export const useShopConfig = (): ShopConfig => {
  const context = useContext(ShopConfigContext);

  if (!context) {
    console.error('Config is required!');
    return defaultConfig;
  }

  return context;
};
