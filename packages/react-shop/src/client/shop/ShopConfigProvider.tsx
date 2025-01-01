import type { ReactNode } from 'react';
import { ShopConfigContext } from './ShopConfigContext';
import type { ShopConfig } from 'src/types/config';

export const ShopConfigProvider = ({
  value,
  children,
}: {
  value: ShopConfig;
  children: ReactNode;
}) => {
  return <ShopConfigContext.Provider value={value}>{children}</ShopConfigContext.Provider>;
};
