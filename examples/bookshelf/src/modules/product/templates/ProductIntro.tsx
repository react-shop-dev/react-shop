'use client';

import { useProductVariant, useRecordContext } from 'react-shop';
import { AddToCartButton } from 'react-shop-mui/AddToCartButton';
import { FlexBox } from 'react-shop-mui/FlexBox';
import { PriceField } from 'react-shop-mui/PriceField';
import { ProductOptions } from 'react-shop-mui/ProductOptions';
import { ProductTags } from 'react-shop-mui/ProductTags';
import { ProductTitle } from 'react-shop-mui/ProductTitle';
import { RatingField } from 'react-shop-mui/RatingField';
import { getPropFromObject } from '@/lib/utils/getPropFromObject';
import { format as formatDate } from 'date-fns';
import { ProductDescription } from '../components/ProductDescription';
import { ProductField } from '../components/ProductField';
import { ProductInventory } from '../components/ProductInventory';
import { Status } from '../components/Status';
import { IntroPlaceholder } from '../skeletons/IntroPlaceholder';
import type { StoreItem } from '@/types';

export const ProductIntro = () => {
  const product = useRecordContext<StoreItem>();
  const variant = useProductVariant();

  if (!product) {
    return <IntroPlaceholder />;
  }

  const inventoryQuantity = getPropFromObject(variant, 'inventory_quantity');

  return (
    <FlexBox flexDirection="column" alignItems="flex-start" gap={1}>
      {/** Tags */}
      <ProductTags item={product}>
        <ProductInventory count={inventoryQuantity} />
      </ProductTags>
      {/** Title */}
      <ProductTitle component="h1" variant="h4" />
      {/** Rating */}
      <RatingField value={product?.rating} sx={{ my: 1 }} />
      {/** Author */}
      <ProductField label="Author" value={product?.author} />
      {/** Brand */}
      <ProductField label="Brand" value={product?.brand} />
      {/** Material */}
      <ProductField label="Material" value={product?.material} />
      {/** Category */}
      <ProductField
        label="Category"
        value={product?.categories[0]?.name}
        href={`/categories/${product?.categories[0]?.handle}`}
        textTransform="capitalize"
      />
      {/** Published Date */}
      <ProductField
        label="Published"
        component="time"
        textTransform="capitalize"
        value={product?.published ? formatDate(product.published, 'dd.MM.yyyy') : null}
      />
      {/** Options */}
      <ProductOptions data={product?.options} sx={{ my: 1.5 }} />
      {/** Status */}
      <Status variant={variant} />
      {/** Price */}
      <PriceField fontSize="1.6rem" record={variant} />
      {/** Description */}
      <ProductDescription value={product?.description} />
      {/** Add to Cart button */}
      <AddToCartButton size="large" sx={{ my: 4 }} />
    </FlexBox>
  );
};
