'use client';
import { ReactElement, ComponentType } from 'react';
import type { Product } from 'react-shop-types';
import {
  cartOpenState,
  useCartProvider,
  useInBasket,
  useInStock,
  useNotify,
  useProductVariant,
  useRecordContext,
  useSetAtom,
} from 'react-shop';
import AddShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  InBasketButton as DefaultInBasketButton,
  type InBasketButtonProps,
} from '../InBasketButton';
import { IconTooltipButton, type IconTooltipButtonProps } from '../IconTooltipButton';
import { Button, type ButtonProps } from '@button/Button';

export const AddToCartButton = (props: AddToCartButtonProps) => {
  const variant = useProductVariant();
  const inStock = useInStock(variant ? [variant] : undefined);

  const {
    iconOnly,
    disabled,
    label = inStock ? 'rs.cart.add' : 'rs.product.outStock',
    icon = defaultIcon,
    notification = false,
    openCartDialog = true,
    inBasketButton: InBasketButton = DefaultInBasketButton,
    ...rest
  } = props;

  const { addItem: addToCart, isFetching } = useCartProvider();
  const setOpen = useSetAtom(cartOpenState);

  const notify = useNotify();
  const record = useRecordContext<Product>(props);
  const inBasket = useInBasket(variant!.id);

  const isDisabled = isFetching || !!disabled || !variant || !inStock;

  const handleClick = () => {
    if (isDisabled) {
      return;
    }
    addToCart({ variantId: variant!.id, item: record });
    if (openCartDialog) {
      setOpen(true);
    }
    notification && notify('rs.cart.added', { type: 'success' });
  };

  if (inBasket) {
    return (
      <InBasketButton
        disabled={isFetching}
        compact={iconOnly}
        onClick={() => setOpen(true)}
        label={!inStock ? 'rs.product.outStock' : undefined}
        aria-label={label}
      />
    );
  }

  if (iconOnly) {
    return (
      <IconTooltipButton
        label={label}
        size="small"
        disabled={isDisabled}
        onClick={handleClick}
        aria-label={label}
        sx={{ p: 1 }}
      >
        {icon}
      </IconTooltipButton>
    );
  }

  return (
    <Button label={label} aria-label={label} disabled={isDisabled} onClick={handleClick} {...rest}>
      {icon}
    </Button>
  );
};

export type AddToCartButtonProps = ButtonProps &
  IconTooltipButtonProps & {
    label?: string;
    ariaLabel?: string;
    icon?: ReactElement;
    record?: Product;
    notification?: boolean;
    iconOnly?: boolean;
    openCartDialog?: boolean;
    inBasketButton?: ComponentType<InBasketButtonProps>;
  };

const defaultIcon = <AddShoppingCartIcon fontSize="small" />;
