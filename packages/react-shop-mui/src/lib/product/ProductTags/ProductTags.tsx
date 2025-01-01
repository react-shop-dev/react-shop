'use client';
import type { ReactNode } from 'react';
import type { Product, ProductTag as ProductTagType } from 'react-shop-types';
import { useProductInterface } from 'react-shop';
import { getDiscountPercentage } from 'react-shop/functions';
import { useTranslate } from 'react-shop/translate';
import get from 'lodash/get';
import Stack from '@mui/material/Stack';
import { ChipProps } from '@mui/material/Chip';
import { StyledChip } from './ProductTags.styles';

const CardChip = ({ type, value, className, ...rest }: CardChipProps) => {
  const translate = useTranslate();

  return (
    <StyledChip
      size="small"
      className={className}
      label={type === 'discount' ? `-${value}%` : translate(`label.${value}`, { _: value })}
      color={type === 'discount' ? 'error' : type === 'new' ? 'success' : 'info'}
      {...rest}
    />
  );
};

export const ProductTags = ({ item, className, children, ...rest }: ProductTagsProps) => {
  const { tags: tagsKey, price, priceOriginal, priceType } = useProductInterface();

  const getPriceInfo = (path: string) => get(item, `price.${path}`);

  return (
    <Stack direction="row" spacing={1} className={className}>
      {get(item, tagsKey, []).map((tag: ProductTagType) =>
        tag?.value ? (
          <CardChip key={tag.id} type={tag.value} value={tag.value.toUpperCase()} {...rest} />
        ) : null,
      )}
      {getPriceInfo(priceType) === 'sales' ? (
        <CardChip
          type="discount"
          value={getDiscountPercentage(getPriceInfo(priceOriginal), getPriceInfo(price))}
          {...rest}
        />
      ) : null}
      {children}
    </Stack>
  );
};

type CardChipProps = ChipProps & {
  type?: ProductTagType['value'];
  value: number | string;
};

export type ProductTagsProps = Omit<ChipProps, 'children'> & {
  item?: Product;
  children?: ReactNode;
};
