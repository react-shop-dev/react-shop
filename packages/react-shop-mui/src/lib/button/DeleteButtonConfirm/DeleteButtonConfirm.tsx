'use client';
import { ReactElement, Fragment } from 'react';
import type { RsRecord } from 'react-shop-types';
import clsx from 'clsx';
import {
  useDeleteWithConfirmController,
  UseDeleteWithConfirmControllerParams,
  useRecordContext,
} from 'react-shop';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import type { SxProps } from '@mui/material/styles';
import { Dialog, type DialogProps } from '@common/Dialog';
import { Button, type ButtonProps } from '@button/Button';
import { IconTooltipButton, type IconTooltipButtonProps } from '@button/IconTooltipButton';

export type DeleteButtonConfirmProps<
  RecordType extends RsRecord = any,
  MutationOptionsError = unknown,
> = Omit<DialogProps, 'open' | 'onClose' | 'onConfirm'> &
  UseDeleteWithConfirmControllerParams<RecordType, MutationOptionsError> & {
    label?: string;
    iconOnly?: boolean;
    buttonIcon?: ReactElement | false;
    onClick?: () => void;
    ButtonProps?: ButtonProps;
    IconButtonProps?: IconTooltipButtonProps;
    sx?: SxProps;
  };

export const DeleteButtonConfirm = <RecordType extends RsRecord = any>(
  props: DeleteButtonConfirmProps<RecordType>,
) => {
  const {
    resource,
    mutationMode = 'pessimistic',
    redirect,
    successMessage,
    mutationOptions,
    onClick,
    iconOnly,
    className,
    label = 'rs.action.delete',
    buttonIcon = defaultButtonIcon,
    dialogTitle = 'rs.action.delete',
    confirmText = 'rs.action.confirm',
    sx,
    ButtonProps = {},
    IconButtonProps = {},
    ...rest
  } = props;

  const record = useRecordContext(props);

  const { open, handleDialogOpen, handleDialogClose, handleDelete, isPending } =
    useDeleteWithConfirmController({
      record,
      resource,
      onClick,
      redirect,
      mutationMode,
      mutationOptions,
      successMessage,
    });

  const renderButton = () =>
    iconOnly ? (
      <IconTooltipButton
        className={clsx('rs-delete-button', className)}
        label={label}
        onClick={handleDialogOpen}
        size="small"
        {...IconButtonProps}
      >
        {buttonIcon !== false ? buttonIcon : undefined}
      </IconTooltipButton>
    ) : (
      <Button
        className={clsx('rs-delete-button', className)}
        color="error"
        label={label}
        onClick={handleDialogOpen}
        {...ButtonProps}
      >
        {buttonIcon !== false ? buttonIcon : undefined}
      </Button>
    );
  return (
    <Fragment>
      {renderButton()}
      <Dialog
        open={open}
        sx={sx}
        isLoading={isPending}
        cancelIcon={null}
        confirmText={confirmText}
        confirmIcon={<HighlightOffIcon />}
        onClose={handleDialogClose}
        onConfirm={handleDelete}
        dialogTitle={dialogTitle}
        ConfirmButtonProps={{
          color: 'error',
        }}
        {...rest}
      />
    </Fragment>
  );
};

const defaultButtonIcon = <DeleteOutlineIcon />;
