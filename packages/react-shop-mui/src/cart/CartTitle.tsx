'use client';
import type { ComponentType } from 'react';
import { useTranslate } from 'react-shop/translate';
import { inflect } from 'inflection';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import ShoppingCart from '@icons/ShoppingCart';
import { FlexBox } from '@views/FlexBox';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export const CartTitle = (props: CartTitleProps) => {
  const { title = 'rs.cart.title', icon: Icon = ShoppingCart, count, ...rest } = props;
  const translate = useTranslate();

  return (
    <FlexBox alignItems="center" gap={1}>
      {translate(title, { _: title })}
      <Icon sx={{ fontSize: 18 }} />
      {count && count > 0 ? (
        <Typography component="span" color="grey.600" fontWeight={500} fontSize={15} {...rest}>
          ({count} {inflect('item', count)})
        </Typography>
      ) : null}
    </FlexBox>
  );
};

export type CartTitleProps = TypographyProps & {
  title?: string;
  icon?: ComponentType<SvgIconProps>;
  count?: number;
};
