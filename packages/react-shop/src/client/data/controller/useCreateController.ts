import { useCallback } from 'react';
import { UseMutationOptions } from '@tanstack/react-query';
import type { Identifier, RsRecord } from 'react-shop-types';
import { useNotify } from '../../notification/useNotify';
import { useCreate, UseCreateMutateParams } from '../mutate/useCreate';
import { useAuthenticated } from '../../auth/useAuthenticated';
import { useRedirect, UseRedirectParams } from '../../router';
import type { SaveContextValue } from '@core/SaveContext';
import type { SaveHandlerCallbacks, TransformData } from '@type/data';

export const useCreateController = <
  RecordType extends Omit<RsRecord, 'id'> = any,
  MutationOptionsError = Error,
  ResultRecordType extends RsRecord = RecordType & { id: Identifier },
>(
  props: CreateControllerProps<RecordType, MutationOptionsError, ResultRecordType> = {},
): CreateControllerResult<RecordType> => {
  const {
    record,
    redirectOptions,
    transform,
    resource,
    disableAuthentication,
    mutationOptions = {},
  } = props;

  useAuthenticated(!disableAuthentication);

  const notify = useNotify();
  const redirect = useRedirect();

  if (!resource) {
    throw new Error('useCreateController requires a non-empty resource prop');
  }

  const { onSuccess, onError, meta, ...otherMutationOptions } = mutationOptions;

  const [create, { isPending: saving }] = useCreate<
    RecordType,
    MutationOptionsError,
    ResultRecordType
  >(resource, undefined, {
    onSuccess: async (data, variables, context) => {
      if (onSuccess) {
        return onSuccess(data, variables, context);
      }
      notify('rs.message.created', {
        type: 'info',
        messageArgs: { smart_count: 1 },
      });
      redirectOptions?.to && redirect(redirectOptions);
    },
    onError: (error: MutationOptionsError, variables, context) => {
      if (onError) {
        return onError(error, variables, context);
      }
      const validationErrors = (error as Error & { body: any })?.body?.errors;
      const hasValidationErrors = !!validationErrors && Object.keys(validationErrors).length > 0;

      if (!hasValidationErrors) {
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
      }
    },
    ...otherMutationOptions,
    returnPromise: true,
  });

  const save = useCallback(
    async (data: Partial<RecordType>, callbacks?: SaveHandlerCallbacks) => {
      const {
        transform: transformFromSave,
        meta: metaFromSave,
        ...callTimeOptions
      } = callbacks || {};

      return Promise.resolve(
        transformFromSave ? transformFromSave(data) : transform ? transform(data) : data,
      ).then(async data => {
        try {
          await create(resource, { data, meta: metaFromSave ?? meta }, callTimeOptions);
        } catch (error) {
          console.error('useCreateController:', error);
          if ((error as Error & { body: any })?.body?.errors != null) {
            return (error as Error & { body: any }).body.errors;
          }
        }
      });
    },
    [transform, create, resource, meta],
  );

  return { save, resource, record, saving, isFetching: false, isLoading: false, isPending: saving };
};

export interface CreateControllerProps<
  RecordType extends Omit<RsRecord, 'id'> = any,
  MutationOptionsError = Error,
  ResultRecordType extends RsRecord = RsRecord & { id: Identifier },
> {
  record?: Partial<RecordType>;
  redirectOptions?: UseRedirectParams;
  transform?: TransformData;
  disableAuthentication?: boolean;
  resource?: string;
  mutationOptions?: UseMutationOptions<
    ResultRecordType,
    MutationOptionsError,
    UseCreateMutateParams<RecordType>
  > & {
    meta?: any;
  };
}

export interface CreateControllerResult<RecordType extends Omit<RsRecord, 'id'> = any>
  extends SaveContextValue {
  resource?: string;
  record?: Partial<RecordType>;
  isFetching: boolean;
  isLoading: boolean;
  isPending: boolean;
}
