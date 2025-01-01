'use client';
import type { ComponentType } from 'react';
import { useTranslate } from 'react-shop/translate';
import Typography from '@mui/material/Typography';
import CartEmptyIcon from '@mui/icons-material/ProductionQuantityLimits';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { Centered } from '@views/Centered';

export type CartEmptyProps = {
  title?: string;
  icon?: ComponentType<SvgIconProps>;
};

const DefaultIcon = CartEmptyIcon;

export const CartEmpty = ({
  title = 'rs.cart.empty',
  icon: Icon = DefaultIcon,
}: CartEmptyProps) => {
  const translate = useTranslate();

  return (
    <Centered sx={{ minHeight: 160 }}>
      <Icon sx={{ width: '2em', height: '2em' }} />
      <Typography component="p" gutterBottom variant="h6">
        {translate(title)}
      </Typography>
    </Centered>
  );
};
