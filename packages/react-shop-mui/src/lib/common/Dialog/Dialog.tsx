'use client';

import {
  MouseEventHandler,
  useCallback,
  MouseEvent,
  ReactNode,
  ReactElement,
  Children,
  isValidElement,
} from 'react';
import { useTranslate } from 'react-shop/translate';
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, type ButtonProps } from '@button/Button';
import { StyledDialogClasses, StyledDialog } from './Dialog.styles';
import { Loader } from '@common/Loader';

export interface DialogProps extends MuiDialogProps {
  dialogTitle?: ReactNode | false;
  confirmText?: string;
  cancelText?: string;
  onClose?: MouseEventHandler;
  onConfirm?: MouseEventHandler;
  confirmMessage?: ReactNode | string;
  open: boolean;
  className?: string;
  isLoading?: boolean;
  cancelIcon?: ReactElement | null;
  confirmIcon?: ReactElement | null;
  showCloseIcon?: boolean;
  ConfirmButtonProps?: ButtonProps;
  CancelButtonProps?: ButtonProps;
  actions?: ReactNode | false;
  disableBackdropClick?: boolean;
  translationOptions?: object;
}

export const Dialog = (props: DialogProps) => {
  const {
    dialogTitle,
    open,
    confirmMessage,
    onClose,
    onConfirm,
    className,
    confirmText = 'rs.action.confirm',
    cancelText = 'rs.action.cancel',
    cancelIcon,
    confirmIcon,
    actions,
    showCloseIcon = true,
    keepMounted = false,
    disableEscapeKeyDown = false,
    isLoading,
    disableBackdropClick = false,
    ConfirmButtonProps = { color: 'secondary' },
    CancelButtonProps = {},
    translationOptions = {},
    children,
    sx,
    ...rest
  } = props;

  const translate = useTranslate();

  const handleConfirm = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      onConfirm && onConfirm(event);
    },
    [onConfirm],
  );

  const handleClose = useCallback(
    (event: MouseEvent, reason: 'escapeKeyDown' | 'backdropClick') => {
      if (reason === 'backdropClick' && disableBackdropClick) {
        return;
      }
      onClose && onClose(event);
    },
    [onClose, disableBackdropClick],
  );

  return (
    <StyledDialog
      open={open}
      disablePortal
      keepMounted={keepMounted}
      onClose={handleClose}
      className={className}
      disableEscapeKeyDown={disableEscapeKeyDown}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <Box sx={sx}>
        {dialogTitle !== false ? (
          <DialogTitle className={StyledDialogClasses.title}>
            {typeof dialogTitle === 'string' ? translate(dialogTitle) : dialogTitle}
          </DialogTitle>
        ) : null}
        {showCloseIcon ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            className={StyledDialogClasses.closeIcon}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
        <DialogContent className={StyledDialogClasses.content}>
          {Children.count(children) > 0 ? (
            children
          ) : typeof confirmMessage === 'string' ? (
            <DialogContentText>
              {translate(confirmMessage, { ...translationOptions })}
            </DialogContentText>
          ) : (
            confirmMessage
          )}
        </DialogContent>
        {actions === false ? null : isValidElement(actions) ? (
          actions
        ) : (
          <DialogActions>
            <Button
              label={cancelText}
              onClick={onClose}
              disabled={isLoading}
              color="inherit"
              {...CancelButtonProps}
            >
              {isValidElement(cancelIcon) ? cancelIcon : undefined}
            </Button>
            <Button
              label={confirmText}
              onClick={handleConfirm}
              disabled={isLoading}
              {...ConfirmButtonProps}
            >
              {isLoading ? (
                <Loader size={16} color="inherit" />
              ) : isValidElement(confirmIcon) ? (
                confirmIcon
              ) : undefined}
            </Button>
          </DialogActions>
        )}
      </Box>
    </StyledDialog>
  );
};
