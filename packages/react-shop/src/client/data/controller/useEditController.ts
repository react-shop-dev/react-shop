import { useCallback } from 'react';
import type { RsRecord } from 'react-shop-types';
import capitalize from 'lodash/capitalize';
import { useParams } from 'next/navigation';
import { singularize } from 'inflection';
import { useNotify } from '../../notification/useNotify';
import { useRedirect, UseRedirectParams } from 'src/client/router';
import { UseGetOneHookValue, UseGetOneOptions, useGetOne } from '../show/useGetOne';
import { useUpdate, UseUpdateOptions } from '../mutate/useUpdate';
import { useAuthenticated } from '../../auth/useAuthenticated';
import type { SaveContextValue } from '../../core/SaveContext';
import type { MutationMode, SaveHandlerCallbacks, TransformData } from '@type/data';

export const useEditController = <RecordType extends RsRecord = any, ErrorType = Error>(
  props: EditControllerProps<RecordType, ErrorType>,
): EditControllerResult<RecordType> => {
  const {
    id: propsId,
    resource,
    disableAuthentication = false,
    mutationMode = 'pessimistic',
    mutationOptions = {},
    queryOptions = {},
    transform,
    redirect: redirectOptions,
  } = props;

  useAuthenticated(!disableAuthentication);

  const notify = useNotify();
  const redirect = useRedirect();

  const params = useParams();
  const routeId = params?.id;

  if (!propsId && !routeId) {
    throw new Error('useEditController requires an id prop or a route with /:id? parameter');
  }

  const id = propsId ?? decodeURIComponent(routeId as string);

  const { meta: queryMeta, ...otherQueryOptions } = queryOptions;
  const { onSuccess, onError, meta: mutationMeta, ...otherMutationOptions } = mutationOptions;

  const {
    data: record,
    error,
    isLoading,
    isFetching,
    isPending,
    refetch,
  } = useGetOne<RecordType>(
    resource,
    { id, meta: queryMeta },
    {
      onError: () => {
        notify('rs.message.item_doesnt_exist', {
          type: 'warning',
        });
      },
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      ...otherQueryOptions,
    },
  );

  if (record && record.id && record.id != id) {
    throw new Error(
      `useEditController: Fetched record's id attribute (${record.id}) must match the requested 'id' (${id})`,
    );
  }

  const recordCached = { id, previousData: record };

  const [update, { isPending: saving }] = useUpdate<RecordType, ErrorType>(resource, recordCached, {
    onSuccess: async (data, variables, context) => {
      if (onSuccess) {
        return onSuccess(data, variables, context);
      }
      notify('rs.message.updated', {
        type: 'success',
        messageArgs: { element: capitalize(singularize(resource)) },
      });
      if (redirectOptions) {
        redirect(redirectOptions);
      }
    },
    onError: (error, variables, context) => {
      if (onError) {
        return onError(error, variables, context);
      }
      const validationErrors = (error as Error & { body: any })?.body?.errors;
      const hasValidationErrors = !!validationErrors && Object.keys(validationErrors).length > 0;

      if (!hasValidationErrors && mutationMode !== 'pessimistic') {
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
    mutationMode,
    returnPromise: mutationMode === 'pessimistic',
  });

  const save = useCallback(
    (data: Partial<RsRecord>, callbacks?: SaveHandlerCallbacks) => {
      const {
        transform: transformFromSave,
        onSuccess: onSuccessFromSave,
        onError: onErrorFromSave,
        meta: metaFromSave,
      } = callbacks || {};
      return Promise.resolve(
        transformFromSave
          ? transformFromSave(data, {
              previousData: recordCached.previousData,
            })
          : transform
            ? transform(data, {
                previousData: recordCached.previousData,
              })
            : data,
      ).then(async (data: Partial<RecordType>) => {
        try {
          await update(
            resource,
            { id, data, meta: metaFromSave ?? mutationMeta },
            {
              onSuccess: onSuccessFromSave,
              onError: onErrorFromSave,
            },
          );
        } catch (error: unknown) {
          console.error('useEditController:', error);
          if ((error as Error & { body: any })?.body?.errors != null) {
            return (error as Error & { body: any }).body.errors;
          }
        }
      });
    },
    [id, update, transform, mutationMeta, resource, recordCached.previousData],
  );

  return {
    save,
    saving,
    resource,
    record,
    error,
    refetch,
    mutationMode,
    isLoading,
    isPending,
    isFetching,
  } as EditControllerResult<RecordType>;
};

export interface EditControllerProps<RecordType extends RsRecord = any, ErrorType = Error> {
  id?: RecordType['id'];
  disableAuthentication?: boolean;
  resource: string;
  redirect?: UseRedirectParams;
  mutationMode?: MutationMode;
  queryOptions?: UseGetOneOptions<RecordType>;
  mutationOptions?: UseUpdateOptions<RecordType, ErrorType>;
  transform?: TransformData;
  [key: string]: any;
}

export interface EditControllerBaseResult<RecordType extends RsRecord = any>
  extends SaveContextValue<RecordType> {
  resource: string;
  isLoading: boolean;
  isFetching: boolean;
  refetch: UseGetOneHookValue<RsRecord>['refetch'];
}

export interface EditControllerSuccessResult<RecordType extends RsRecord = any>
  extends EditControllerBaseResult<RecordType> {
  record: RecordType;
  error: null;
  isPending: false;
}

export interface EditControllerLoadingResult<RecordType extends RsRecord = any>
  extends EditControllerBaseResult<RecordType> {
  record: undefined;
  error: null;
  isPending: true;
}

export interface EditControllerErrorResult<RecordType extends RsRecord = any, TError = Error>
  extends EditControllerBaseResult<RecordType> {
  record: undefined;
  error: TError;
  isPending: false;
}

export interface EditControllerRefetchErrorResult<RecordType extends RsRecord = any, TError = Error>
  extends EditControllerBaseResult<RecordType> {
  record: RecordType;
  error: TError;
  isPending: false;
}

export type EditControllerResult<RecordType extends RsRecord = any> =
  | EditControllerSuccessResult<RecordType>
  | EditControllerLoadingResult<RecordType>
  | EditControllerErrorResult<RecordType>
  | EditControllerRefetchErrorResult<RecordType>;
