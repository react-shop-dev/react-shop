import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeType } from 'src/types';

export const useThemesContext = (params?: UseThemeContextParams) => {
  const context = useContext(ThemeContext);
  const { theme, defaultMode } = params || {};

  return {
    theme: theme || context.theme,
    defaultMode: defaultMode ?? context.defaultMode,
  };
};

export interface UseThemeContextParams<ThemeOptions = any> {
  theme?: ThemeOptions;
  defaultMode?: ThemeType;
  [key: string]: any;
}
