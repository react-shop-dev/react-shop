import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { PageView } from 'react-shop-mui/PageView';
import { redirect } from 'next/navigation';
import CategoryMenu from '@/modules/common/CategoryMenu';
import { Provider } from '@/modules/product/Provider';
import { ProductBreadcrumms } from '@/modules/product/components/Breadcrumbs';

type ProductLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug?: string }>;
  tabs: ReactNode;
  modal?: ReactNode;
};

export default async function ProductLayout(props: ProductLayoutProps) {
  const slug = (await props.params).slug;
  const { children, tabs, modal } = props;

  if (!slug) {
    redirect('/');
  }

  return (
    <Fragment>
      <Provider slug={slug}>
        <PageView breadcrumbs={<ProductBreadcrumms />} drawer={<CategoryMenu />}>
          {children}
          {tabs}
        </PageView>
      </Provider>
      {modal}
    </Fragment>
  );
}
