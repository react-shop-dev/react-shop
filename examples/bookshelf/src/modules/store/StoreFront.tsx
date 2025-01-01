'use client';

import type { FC, PropsWithChildren } from 'react';
import { ShopClient } from 'react-shop';
import { MaterialUIProvider } from 'react-shop-mui';
import { Notification } from 'react-shop-mui/Notification';
import { buildDataProvider } from '@/lib/data/buildDataProvider';
import { StoreLayout } from '@/modules/layout/StoreLayout';
import { theme } from './theme';

const dataProvider = buildDataProvider();

export const StoreFront: FC<PropsWithChildren> = ({ children }) => (
  <ShopClient
    dataProvider={dataProvider}
    uiProvider={MaterialUIProvider}
    notification={Notification}
    layout={StoreLayout}
    themeProps={{
      theme,
    }}
  >
    {children}
  </ShopClient>
);
