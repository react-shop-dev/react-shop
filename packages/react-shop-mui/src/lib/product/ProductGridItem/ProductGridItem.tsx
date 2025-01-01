import type { ComponentType } from 'react';
import type { Product } from 'react-shop-types';
import { useRecordContext } from 'react-shop';
import type { SxProps } from '@mui/material/styles';
import CardContent from '@mui/material/Card';
import { ProductCard, ProductCardTile } from '../ProductCard';
import { ProductTitle, type ProductTitleProps } from '../ProductTitle';
import { ProductTags, type ProductTagsProps } from '../ProductTags';
import { ProductPicture, type ProductPictureProps } from '../ProductPicture';
import { PriceField, type PriceFieldProps } from '../../field/PriceField';
import { ProductActions as DefaultActions, ProductActionsProps } from '../ProductActions';
import { ProductStatus, type ProductStatusProps } from '../ProductStatus';
import { ProductCardClasses } from '../ProductCard/ProductCard.styles';

export interface ProductItemProps {
  sx?: SxProps;
  item?: Product;
  picture?: ComponentType<ProductPictureProps>;
  title?: ComponentType<ProductTitleProps>;
  price?: ComponentType<PriceFieldProps>;
  tags?: ComponentType<ProductTagsProps>;
  status?: ComponentType<ProductStatusProps>;
  actions?: ComponentType<ProductActionsProps>;
}

export const ProductGridItem = (props: ProductItemProps) => {
  const {
    item: itemProp,
    picture: Picture = ProductPicture,
    title: Title = ProductTitle,
    price: Price = PriceField,
    tags: Tags = ProductTags,
    status: Status = ProductStatus,
    actions: Actions = DefaultActions,
    sx,
  } = props;

  const item = useRecordContext<Product>({ record: itemProp });

  return (
    <ProductCard sx={sx} className={ProductCardClasses.grid}>
      <Tags item={item} className={ProductCardClasses.tags} />
      <Picture id={item?.id} hasLink className={ProductCardClasses.picture} />
      <CardContent className={ProductCardClasses.gridContent} elevation={0}>
        <Title hasLink variant="subtitle1" component="h3" />
        <Price />
        <ProductCardTile gridMode>
          <Status />
          <Actions gridMode />
        </ProductCardTile>
      </CardContent>
    </ProductCard>
  );
};
