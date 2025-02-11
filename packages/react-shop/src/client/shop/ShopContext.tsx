import { ReactNode, useMemo } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { getShopConfig } from '@functions/shopConfig';
import { ShopConfigProvider } from './ShopConfigProvider';
import { IntlClientProvider } from '../i18n';
import { DataProviderContext } from '@data/DataProviderContext';
import { NotificationContextProvider } from '../notification/NotificationProvider';
import { CartProvider, CartAdapterComponent } from '../cart/CartProvider';
import { getQueryClient } from './getQueryClient';
import { defaultDataProvider } from '@functions/defaultDataProvider';
import type { DataProvider } from '@type/data';

export interface ShopContextProps {
  queryClient?: QueryClient;
  dataProvider?: DataProvider;
  cartAdapter?: CartAdapterComponent;
  children: ReactNode;
}

export const ShopContext = (props: ShopContextProps) => {
  const { dataProvider = defaultDataProvider, queryClient, cartAdapter, children } = props;

  const { config, translate } = getShopConfig();

  const finalQueryClient = useMemo(() => queryClient || getQueryClient(), [queryClient]);

  return (
    <ShopConfigProvider value={config}>
      <DataProviderContext.Provider value={dataProvider}>
        <QueryClientProvider client={finalQueryClient}>
          <ReactQueryStreamedHydration>
            <CartProvider cartAdapter={cartAdapter}>
              <IntlClientProvider {...translate}>
                <NotificationContextProvider>{children}</NotificationContextProvider>
              </IntlClientProvider>
            </CartProvider>
          </ReactQueryStreamedHydration>
        </QueryClientProvider>
      </DataProviderContext.Provider>
    </ShopConfigProvider>
  );
};
