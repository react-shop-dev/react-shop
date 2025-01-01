import { type PropsWithChildren } from 'react';
import { Header } from 'react-shop-mui/Header';
import { Layout } from 'react-shop-mui/Layout';
import { TopBar } from 'react-shop-mui/TopBar';
import { StoreCatalog } from './StoreCatalog';
import { TopBarMenu } from './TopBarMenu';

export const StoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout
      topBar={<TopBar navbar={<TopBarMenu />} />}
      header={<Header catalogMenu={<StoreCatalog />} />}
    >
      {children}
    </Layout>
  );
};
