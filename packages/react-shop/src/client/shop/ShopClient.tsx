import type { ReactNode } from 'react';
import { ShopContext, ShopContextProps } from './ShopContext';
import { ShopUI, ShopUIProps } from './ShopUI';
import { AppRouter, AppRouterProps } from '../router/AppRouter';

export interface ShopClientProps extends ShopContextProps, ShopUIProps, AppRouterProps {
  children: ReactNode;
}

export const ShopClient = (props: ShopClientProps) => {
  const {
    queryClient,
    dataProvider,
    cartAdapter,
    uiProvider,
    themeProps,
    layout,
    notification,
    progress,
    devTools,
    children,
  } = props;

  return (
    <ShopContext dataProvider={dataProvider} cartAdapter={cartAdapter} queryClient={queryClient}>
      <ShopUI
        uiProvider={uiProvider}
        notification={notification}
        themeProps={themeProps}
        progress={progress}
        devTools={devTools}
      >
        <AppRouter layout={layout}>{children}</AppRouter>
      </ShopUI>
    </ShopContext>
  );
};

ShopClient.displayName = 'ShopClient';
