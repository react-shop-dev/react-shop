import { useRecordContext } from 'react-shop';
import type { Product } from 'react-shop-types';
import CardContent from '@mui/material/Card';
import { ProductItemProps } from '../ProductGridItem';
import { ProductTitle } from '../ProductTitle';
import { ProductCard, ProductCardTile } from '../ProductCard';
import { ProductPicture } from '../ProductPicture';
import { ProductTags } from '../ProductTags';
import { ProductActions as DefaultActions } from '../ProductActions';
import { RatingField } from '../../field/RatingField';
import { PriceField } from '../../field/PriceField';
import { ProductStatus } from '../ProductStatus';
import { ProductCardClasses } from '../ProductCard/ProductCard.styles';

export const ProductListItem = (props: ProductItemProps) => {
  const {
    item: itemProp,
    title: Title = ProductTitle,
    picture: Picture = ProductPicture,
    tags: Tags = ProductTags,
    price: Price = PriceField,
    status: Status = ProductStatus,
    actions: Actions = DefaultActions,
    sx,
  } = props;

  const item = useRecordContext<Product>({ record: itemProp });

  return (
    <ProductCard sx={sx} className={ProductCardClasses.list}>
      <Tags item={item} className={ProductCardClasses.tags} />
      <Picture id={item?.id} hasLink className={ProductCardClasses.picture} />
      <CardContent className={ProductCardClasses.listContent} elevation={0}>
        <Title hasLink variant="subtitle1" component="h3" width="fit-content" />
        <RatingField size="small" value={item?.rating} />
        <Price display="flex" />
        <ProductCardTile>
          <Status />
          <Actions />
        </ProductCardTile>
      </CardContent>
    </ProductCard>
  );
};
