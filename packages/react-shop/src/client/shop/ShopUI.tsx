import type { ReactNode, ComponentType } from 'react';
import { Fragment, createElement } from 'react';
import { ThemeContext, ThemeContextValue } from '../theme/ThemeContext';
import { GoogleAnalytics } from '../components/Analytics';
import { MetaTags } from '../components/MetaTags';
import { Progress, ProgressPropsProps } from '../components/Progress';
import { useAnalytics } from '../hooks/useAnalytics';
import { DevTools, DevToolsProps } from '../components/DevTools';
import { getShopConfig } from '@functions/shopConfig';

export interface ShopUIProps<UIProviderProps = any> {
  themeProps?: ThemeContextValue;
  children: ReactNode;
  progress?: ProgressPropsProps;
  notification?: ComponentType;
  uiProvider?: ComponentType<UIProviderProps>;
  devTools?: DevToolsProps | false;
}

export const ShopUI = (props: ShopUIProps) => {
  const {
    uiProvider: UIProvider = DefaultUIProvider,
    notification,
    themeProps: { theme, defaultMode } = {},
    progress,
    devTools,
    children,
  } = props;

  const { config } = getShopConfig();
  const gtag = config?.gtag;
  useAnalytics(gtag);

  return (
    <Fragment>
      <Progress showSpinner={false} {...progress} />
      <ThemeContext.Provider
        value={{
          theme,
          defaultMode,
        }}
      >
        <MetaTags />
        <UIProvider>
          {children}
          {notification && createElement(notification)}
        </UIProvider>
      </ThemeContext.Provider>
      {gtag ? <GoogleAnalytics gtag={gtag} /> : null}
      {devTools !== false ? <DevTools {...devTools} /> : null}
    </Fragment>
  );
};

const DefaultUIProvider = ({ children }: { children: ReactNode }) => <>{children}</>;

ShopUI.displayName = 'ShopUI';
