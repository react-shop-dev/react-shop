'use client';

import { ShopClient } from 'react-shop';
import { MaterialUIProvider } from 'react-shop-mui';
import { Notification } from 'react-shop-mui/Notification';
import { Layout } from 'react-shop-mui/Layout';
import theme from './theme';
import { dataProvider } from '@/lib/dataProvider';

export const StoreFront = ({ children }: { children: React.ReactNode }) => (
  <ShopClient
    dataProvider={dataProvider}
    uiProvider={MaterialUIProvider}
    notification={Notification}
    layout={Layout}
    themeProps={theme}
  >
    {children}
  </ShopClient>
);
