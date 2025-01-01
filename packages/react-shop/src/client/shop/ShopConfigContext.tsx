import { createContext } from 'react';
import type { ShopConfig } from 'src/types/config';

export type ShopConfigContextResult = ShopConfig | null;

export const ShopConfigContext = createContext<ShopConfigContextResult>(null);

ShopConfigContext.displayName = 'ShopConfigContext';
