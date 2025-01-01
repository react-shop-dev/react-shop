import { useMemo, type PropsWithChildren } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  type Direction,
  type ThemeOptions,
  type CssVarsThemeOptions,
} from '@mui/material/styles';
import deepmerge from '@mui/utils/deepmerge';
import unset from 'lodash/unset';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import defaultTheme from 'src/theme/defaultTheme';
import type { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { COLOR_SCHEME_DARK, COLOR_SCHEME_LIGHT } from '../constants';

type EnhancedThemeOptions = ThemeOptions & CssVarsThemeOptions;

export type EnhancedThemeProviderProps = PropsWithChildren &
  Omit<ThemeProviderProps, 'theme'> & {
    attribute?: 'media' | 'class' | 'data' | string;
    theme?: EnhancedThemeOptions;
  };

export const ThemeProvider = (props: EnhancedThemeProviderProps & { unsetLightMode?: boolean }) => {
  const { theme, children, attribute, unsetLightMode, ...rest } = props;

  const themeValue = useMemo(() => {
    try {
      const cssVarsOptions: CssVarsThemeOptions = {
        cssVarPrefix: 'shop',
        colorSchemeSelector: attribute,
        disableCssColorScheme: false,
      };
      const extendedTheme = createTheme(
        deepmerge(defaultTheme, {
          direction: 'ltr' as Direction,
          defaultColorScheme: unsetLightMode ? COLOR_SCHEME_DARK : COLOR_SCHEME_LIGHT,
          cssVariables: cssVarsOptions,
          ...theme,
        }),
      );
      if (unsetLightMode) {
        unset(extendedTheme, 'colorSchemes.light');
      }
      return responsiveFontSizes(extendedTheme);
    } catch (e) {
      console.warn('Failed to create theme', e);
      return createTheme(defaultTheme);
    }
  }, [theme, attribute, unsetLightMode]);

  return (
    <MuiThemeProvider theme={themeValue} {...rest}>
      {children}
    </MuiThemeProvider>
  );
};
