'use client';

import { useRecordContext } from 'react-shop';
import { Breadcrumbs } from 'react-shop-mui/Breadcrumbs';
import { useTranslate } from 'react-shop/translate';
import type { StoreItem } from '@/types';

export const ProductBreadcrumms = () => {
  const product = useRecordContext<StoreItem>();
  const translate = useTranslate();

  const productCategory = product?.categories[0];
  const categoryName = productCategory?.name;

  return (
    <Breadcrumbs>
      {categoryName ? (
        <Breadcrumbs.Item
          to={`/categories/${productCategory?.handle}`}
          label={translate(`category.${categoryName}`, { _: categoryName })}
        />
      ) : null}
      {product?.title ? <Breadcrumbs.Item label={product.title} /> : null}
    </Breadcrumbs>
  );
};
