import type { ReactNode } from 'react';
import { useThemesContext } from 'react-shop';
import { isBrowser } from 'react-shop/functions';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import GlobalStyles, { type GlobalStylesProps } from '@mui/material/GlobalStyles';
import type { Options as OptionsOfCreateCache } from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import { EmotionCacheProvider } from './EmotionCacheProvider';
import { ThemeProvider, type EnhancedThemeProviderProps } from './ThemeProvider';
import { COLOR_SCHEME_DARK, COLOR_SCHEME_LIGHT } from '../constants';

export type MaterialUIProviderProps = EnhancedThemeProviderProps & {
  children: ReactNode;
  globalStyles?: GlobalStylesProps['styles'];
  options?: Omit<OptionsOfCreateCache, 'insertionPoint'>;
  defaultLightColorScheme?: string;
  defaultDarkColorScheme?: string;
  unsetLightMode?: boolean;
};

export const MaterialUIProvider = (props: MaterialUIProviderProps) => {
  const {
    children,
    globalStyles = defaultStyles,
    options = defaultCacheOptions,
    attribute = 'data-theme',
    modeStorageKey = 'shop-theme-mode',
    colorSchemeStorageKey,
    defaultLightColorScheme = COLOR_SCHEME_LIGHT,
    defaultDarkColorScheme = COLOR_SCHEME_DARK,
    unsetLightMode = false,
    ...rest
  } = props;

  const { theme } = useThemesContext();

  return (
    <EmotionCacheProvider options={options}>
      <GlobalStyles styles={globalStyles} />
      <InitColorSchemeScript
        attribute={attribute}
        modeStorageKey={modeStorageKey}
        colorSchemeStorageKey={colorSchemeStorageKey}
        defaultLightColorScheme={defaultLightColorScheme}
        defaultDarkColorScheme={defaultDarkColorScheme}
      />
      <ThemeProvider
        theme={theme}
        {...{
          // Additional props
          attribute,
          unsetLightMode,
          // Mui ThemeProvider props
          modeStorageKey,
          colorSchemeStorageKey,
          ...rest,
        }}
      >
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </EmotionCacheProvider>
  );
};

const defaultStyles = { html: { WebkitFontSmooting: 'auto', scrollBehavior: 'smooth' } };

const defaultCacheOptions = {
  key: 'mui-shop',
  enableCssLayer: true,
  insertionPoint: isBrowser()
    ? document.querySelector<HTMLMetaElement>('meta[name="emotion-insertion-point"]')
    : undefined,
};
