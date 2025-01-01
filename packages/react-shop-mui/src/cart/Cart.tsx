import type { ReactElement } from 'react';
import { isValidElement } from 'react';
import { cartOpenState, useAtom, useCartProvider, useNavigationEvent } from 'react-shop';
import useMediaQuery from '@mui/material/useMediaQuery';
import { type SxProps, useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { Dialog, type DialogProps } from '@common/Dialog';
import { ZoomDialog } from '@common/ZoomDialog';
import { CartEmpty } from './CartEmpty';
import { CartTitle } from './CartTitle';
import { CartActions } from './CartActions';
import { CartTable } from './CartTable';

export type CartProps = {
  children?: ReactElement;
  dialog?: Omit<DialogProps, 'open'> & { open?: boolean };
  sx?: SxProps;
};

export const Cart = (props: CartProps) => {
  const { children, dialog, sx = [] } = props;

  const [open, setOpen] = useAtom(cartOpenState);
  const { data, isFetching, itemsTotal } = useCartProvider();
  const theme = useTheme();
  const isMediaMatch = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  const isEmpty = !isFetching && itemsTotal === 0;

  const handleDialogClose = () => {
    setOpen(false);
  };

  useNavigationEvent(() => {
    open && setOpen(false);
  });

  const renderDialogContent = () =>
    !isEmpty ? <CartTable isLoading={isFetching} data={data || []} /> : <CartEmpty />;

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth={false}
      dialogTitle={<CartTitle count={Number(itemsTotal)} />}
      TransitionComponent={ZoomDialog}
      actions={<CartActions handleClose={handleDialogClose} isEmpty={isEmpty} />}
      sx={[
        {
          maxWidth: theme.breakpoints.values.md,
          minWidth: isMediaMatch ? '80dvw' : '50dvw',
          pb: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...dialog}
    >
      {isValidElement(children) ? children : renderDialogContent()}
    </Dialog>
  );
};

export default Cart;
