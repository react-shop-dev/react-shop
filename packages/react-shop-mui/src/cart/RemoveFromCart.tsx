'use client';
import { useCallback, ReactElement } from 'react';
import type { Identifier } from 'react-shop-types';
import { useCartProvider } from 'react-shop';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { IconTooltipButton, type IconTooltipButtonProps } from '@button/IconTooltipButton';
import { Button, type ButtonProps } from '@button/Button';

export const RemoveFromCart = ({
  id,
  label = 'rs.action.remove',
  ariaLabel = 'rs.cart.remove',
  icon = defaultIcon,
  disabled,
  iconOnly = true,
  ...rest
}: RemoveItemProps) => {
  const { removeItem, isFetching } = useCartProvider();

  const isDisabled = disabled || isFetching;

  const handleClick = useCallback(() => {
    removeItem({ lineId: id });
  }, [id, removeItem]);

  if (iconOnly) {
    return (
      <IconTooltipButton
        label={label}
        size="small"
        onClick={handleClick}
        disabled={isDisabled}
        color="error"
        aria-label={ariaLabel}
        {...rest}
      >
        {icon}
      </IconTooltipButton>
    );
  }

  return (
    <Button
      label={label}
      ariaLabel={ariaLabel}
      variant="text"
      color="error"
      disabled={disabled}
      {...rest}
    >
      {icon}
    </Button>
  );
};

export type RemoveItemProps = ButtonProps &
  IconTooltipButtonProps & {
    id: Identifier;
    icon?: ReactElement;
    iconOnly?: boolean;
  };

const defaultIcon = <RemoveShoppingCartIcon color="inherit" sx={{ fontSize: 16 }} />;
