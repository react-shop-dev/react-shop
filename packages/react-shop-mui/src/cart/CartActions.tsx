import { type MouseEventHandler, type ComponentType, Fragment } from 'react';
import type { SxProps } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { CheckoutLink as DefaultCheckoutLink } from '@button/CheckoutLink';
import { Button } from '@button/Button';

export type CartActionsProps = {
  isEmpty?: boolean;
  isLoading?: boolean;
  sx?: SxProps;
  linkToCheckout?: string;
  handleClose: MouseEventHandler;
  shoppingButton?: ComponentType;
  checkoutLink?: ComponentType;
};

export const CartActions = (props: CartActionsProps) => {
  const {
    isEmpty,
    isLoading,
    handleClose,
    shoppingButton: StartShopping = Button,
    checkoutLink: CheckoutLink = DefaultCheckoutLink,
    sx = [],
  } = props;

  const isMediaMatch = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={isMediaMatch ? 'column' : 'row'}
      justifyContent={isEmpty ? 'center' : 'space-between'}
      sx={[{ py: 1, px: 3 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {isLoading ? (
        <LinearProgress color="inherit" sx={{ width: '100%' }} />
      ) : (
        <Fragment>
          <StartShopping
            fullWidth={isMediaMatch}
            label={isEmpty ? 'rs.action.start' : 'rs.action.continue'}
            onClick={handleClose}
            {...(isEmpty
              ? {}
              : {
                  variant: 'outlined',
                  sx: { color: 'inherit' },
                })}
          />
          {!isEmpty ? <CheckoutLink fullWidth={isMediaMatch} /> : null}
        </Fragment>
      )}
    </Stack>
  );
};
