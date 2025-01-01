import { ReactElement, isValidElement } from 'react';
import { useNavigationEvent, authPopupState, useAuthState, useAtom } from 'react-shop';
import { Dialog, DialogProps } from '@common/Dialog';
import { ZoomDialog } from '@common/ZoomDialog';
import { AuthBase, AuthBaseProps } from './AuthBase';

export interface AuthDialogProps extends Omit<DialogProps, 'open'> {
  children?: ReactElement<AuthBaseProps>;
}

export const AuthDialog = (props: AuthDialogProps) => {
  const { children, sx = [], ...rest } = props;

  const [open, setOpen] = useAtom(authPopupState);
  const { authenticated } = useAuthState();

  const handleDialogClose = () => {
    setOpen(false);
  };

  useNavigationEvent(() => {
    open && setOpen(false);
  });

  return !authenticated ? (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth={false}
      dialogTitle={false}
      TransitionComponent={ZoomDialog}
      actions={false}
      keepMounted
      sx={[{ pb: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...rest}
    >
      {isValidElement(children) ? children : <AuthBase />}
    </Dialog>
  ) : null;
};

export default AuthDialog;
