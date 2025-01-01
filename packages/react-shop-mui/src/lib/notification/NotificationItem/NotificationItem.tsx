'use client';
import {
  useCallback,
  forwardRef,
  isValidElement,
  ReactNode,
  SyntheticEvent,
  ReactElement,
} from 'react';
import type { NotificationType } from 'react-shop';
import { useTranslate } from 'react-shop/translate';
import clsx from 'clsx';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
  type SnackbarProps,
  type SnackbarOrigin,
  type SnackbarCloseReason,
} from '@mui/material/Snackbar';
import type { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { StyledNotificationClasses, StyledSnackbar } from './NotificationItem.styles';

export interface NotificationProps extends Omit<SnackbarProps, 'open'> {
  multiline?: boolean;
  type?: string;
  closeOnClickAway?: boolean;
  alertProps?: AlertProps;
  item: NotificationType;
  handleClose?: () => void;
}

const Notification = (props: NotificationProps) => {
  const {
    className,
    autoHideDuration = 4000,
    type = 'info',
    multiline = false,
    closeOnClickAway = true,
    anchorOrigin = defaultOrigin,
    alertProps,
    handleClose,
    item: currentNotification,
    TransitionComponent = DefaultTransition,
    ...rest
  } = props;

  const handleRequestClose = useCallback(
    (_event: Event | SyntheticEvent, reason: SnackbarCloseReason) => {
      if (!closeOnClickAway && reason === 'clickaway') {
        return;
      }
      handleClose && handleClose();
    },
    [closeOnClickAway, handleClose],
  );

  const {
    open,
    message,
    type: typeFromMessage,
    notificationOptions,
  } = currentNotification as NotificationType;

  const onEntered = () => {
    currentNotification.entered = true;
  };

  const onExit = () => {
    currentNotification.entered = false;
  };

  return (
    <StyledSnackbar
      open={open}
      className={className}
      anchorOrigin={anchorOrigin}
      onClose={handleRequestClose}
      TransitionComponent={TransitionComponent}
      disableWindowBlurListener
      autoHideDuration={notificationOptions?.autoHideDuration || autoHideDuration}
      TransitionProps={{ onEntered, onExit }}
      {...rest}
    >
      <NotificationMessage
        message={message}
        severity={typeFromMessage || type}
        className={StyledNotificationClasses[typeFromMessage || type]}
        multiline={notificationOptions?.multiLine || multiline}
        messageArgs={notificationOptions?.messageArgs}
        {...alertProps}
      />
    </StyledSnackbar>
  );
};

export default Notification;

const DefaultTransition = (
  props: Omit<TransitionProps, 'children'> & { children: ReactElement },
) => {
  return <Slide {...props} direction="left" />;
};

interface NotificationMessageProps {
  message: string | ReactNode;
  multiline?: boolean;
  messageArgs?: object;
}

const NotificationMessage = forwardRef<HTMLDivElement, AlertProps & NotificationMessageProps>(
  ({ message, multiline, className, messageArgs, ...props }, ref) => {
    const translate = useTranslate();

    return message && typeof message !== 'string' && isValidElement(message) ? (
      <span ref={ref} className={className}>
        {message}
      </span>
    ) : (
      <MuiAlert
        elevation={6}
        ref={ref}
        variant="standard"
        classes={{
          message: clsx({
            [StyledNotificationClasses.multiline]: multiline,
          }),
        }}
        sx={{ width: '100%', backgroundColor: 'inherit' }}
        {...props}
      >
        {typeof message === 'string' ? translate(message, messageArgs) : message}
      </MuiAlert>
    );
  },
);

const defaultOrigin: SnackbarOrigin = { vertical: 'top', horizontal: 'right' };

NotificationMessage.displayName = 'NotificationMessage';
