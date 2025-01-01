import { Fragment } from 'react';
import { useRecordContext } from 'react-shop';
import type { Product } from 'react-shop-types';
import { AddToCartButton } from '@button/AddToCartButton';
import VariantIcon from '@mui/icons-material/DynamicFeed';
import { Button } from '@button/Button';
import { ProductLink } from '../ProductLink';

export const ProductActions = (props: ProductActionsProps) => {
  const { gridMode } = props;
  const item = useRecordContext<Product>(props);

  return (
    <Fragment>
      {item?.variants?.length === 1 ? (
        <AddToCartButton iconOnly={gridMode} />
      ) : !gridMode ? (
        <SelectVariantButton />
      ) : null}
    </Fragment>
  );
};

const SelectVariantButton = () => (
  <Button
    label="Select variant"
    component={ProductLink}
    startIcon={<VariantIcon fontSize="small" />}
  />
);

export type ProductActionsProps = { gridMode?: boolean; record?: Product };
