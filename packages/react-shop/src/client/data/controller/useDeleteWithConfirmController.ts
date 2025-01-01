import { type ReactEventHandler, useState, useCallback, type SyntheticEvent } from 'react';
import type { RsRecord } from 'react-shop-types';
import { useDelete } from '@data/mutate';
import { useNotify } from '../../notification/useNotify';
import type { DeleteParams, MutationMode } from '@type/data';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useRedirect, type UseRedirectParams } from 'src/client/router';

export interface UseDeleteWithConfirmControllerParams<
  RecordType extends RsRecord = any,
  MutationOptionsError = unknown,
> {
  mutationMode?: MutationMode;
  resource: string;
  record?: RecordType;
  redirect?: UseRedirectParams;
  onClick?: ReactEventHandler;
  successMessage?: string;
  mutationOptions?: UseMutationOptions<RecordType, MutationOptionsError, DeleteParams<RecordType>>;
}

export const useDeleteWithConfirmController = <RecordType extends RsRecord = any>(
  props: UseDeleteWithConfirmControllerParams<RecordType>,
): UseDeleteWithConfirmControllerReturn => {
  const {
    resource,
    record,
    successMessage,
    mutationMode,
    redirect: redirectOptions,
    mutationOptions = {},
    onClick,
  } = props;
  const [open, setOpen] = useState(false);
  const redirect = useRedirect();
  const notify = useNotify();
  const { meta: mutationMeta, ...otherMutationOptions } = mutationOptions;

  const [deleteOne, { isPending }] = useDelete(resource, undefined, {
    onSuccess: () => {
      setOpen(false);
      if (successMessage) {
        notify(successMessage, { type: 'success' });
      }
      if (redirectOptions) {
        redirect(redirectOptions);
      }
    },
    onError: (error: Error) => {
      setOpen(false);
      notify(
        typeof error === 'string'
          ? error
          : error instanceof Error
            ? error.message
            : 'rs.message.http_error',
        {
          type: 'warning',
          messageArgs: {
            _:
              typeof error === 'string'
                ? error
                : error instanceof Error
                  ? error.message
                  : undefined,
          },
        },
      );
    },
  });

  const handleDialogOpen = (event: SyntheticEvent) => {
    setOpen(true);
    event.stopPropagation();
  };

  const handleDialogClose = (event: SyntheticEvent) => {
    setOpen(false);
    event.stopPropagation();
  };

  const handleDelete = useCallback(
    (event: SyntheticEvent) => {
      event.stopPropagation();
      if (!record) {
        throw new Error('The record cannot be deleted because no record has been passed');
      }

      deleteOne(
        resource,
        { id: record.id, previousData: record, meta: mutationMeta },
        // @ts-ignore Optional Id
        { mutationMode, ...otherMutationOptions },
      );
      if (typeof onClick === 'function') {
        onClick(event);
      }
    },
    [deleteOne, onClick, record, resource, mutationMode, mutationMeta, otherMutationOptions],
  );

  return {
    open,
    isPending,
    handleDialogOpen,
    handleDialogClose,
    handleDelete,
  };
};

export interface UseDeleteWithConfirmControllerReturn {
  open: boolean;
  isPending: boolean;
  handleDialogOpen: (e: SyntheticEvent) => void;
  handleDialogClose: (e: SyntheticEvent) => void;
  handleDelete: ReactEventHandler<any>;
}
