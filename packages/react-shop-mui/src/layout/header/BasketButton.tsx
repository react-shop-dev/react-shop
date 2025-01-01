'use client';
import type { ComponentType } from 'react';
import { cartOpenState, useCartProvider, useSetAtom } from 'react-shop';
import { useTranslate } from 'react-shop/translate';
import { useRouter } from 'next/navigation';
import isNumber from 'lodash/isNumber';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import type { IconButtonProps } from '@mui/material/IconButton';
import { Loader } from '@common/Loader';
import { IconBoxButton } from '@common/IconBoxButton';
import ShoppingCart from '@icons/ShoppingCart';

export type BasketButtonProps = IconButtonProps & {
  label?: string;
  link?: string;
  icon?: ComponentType<SvgIconProps>;
  ariaLabel?: string;
};

export const BasketButton = (props: BasketButtonProps) => {
  const {
    link,
    label = link ? 'rs.cart.link' : 'rs.cart.open',
    ariaLabel = label,
    icon: Icon = ShoppingCart,
    ...rest
  } = props;

  const setOpen = useSetAtom(cartOpenState);
  const router = useRouter();
  const { itemsTotal, isFetching } = useCartProvider();
  const translate = useTranslate();

  const icon = isFetching ? <Loader size={24} /> : <Icon color="inherit" />;

  const handleClick = () => {
    if (link) {
      router.push(link);
    } else {
      setOpen(true);
    }
  };

  return (
    <Tooltip title={translate(label)}>
      <Badge color="primary" {...(isNumber(itemsTotal) ? { badgeContent: itemsTotal } : {})}>
        <IconBoxButton aria-label={ariaLabel} onClick={handleClick} {...rest}>
          {icon}
        </IconBoxButton>
      </Badge>
    </Tooltip>
  );
};
