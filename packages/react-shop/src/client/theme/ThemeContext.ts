import { createContext } from 'react';
import type { ThemeType } from 'src/types';

export const ThemeContext = createContext<ThemeContextValue>({});

ThemeContext.displayName = 'ShopThemeContext';

export interface ThemeContextValue<ThemeOptions = any> {
  theme?: ThemeOptions;
  defaultMode?: ThemeType;
}
