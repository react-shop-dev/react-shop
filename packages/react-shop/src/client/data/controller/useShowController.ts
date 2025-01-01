import type { RsRecord } from 'react-shop-types';
import { useNotify } from '../../notification/useNotify';
import { UseGetOneHookValue, UseGetOneOptions, useGetOne } from '../show/useGetOne';

export const useShowController = <RecordType extends RsRecord = any>(
  props: ShowControllerProps<RecordType>,
): ShowControllerResult<RecordType> => {
  const { id, resource, queryOptions = {} } = props;

  const notify = useNotify();

  if (!resource) {
    throw new Error('useShowController requires a non-empty resource prop');
  }

  const { meta, ...otherQueryOptions } = queryOptions;

  const {
    data: record,
    error,
    isLoading,
    isPending,
    isFetching,
    refetch,
  } = useGetOne<RecordType>(
    resource,
    {
      id,
      meta,
    },
    {
      onError: () => {
        notify('Item does not exists', {
          type: 'error',
        });
      },
      retry: false,
      ...otherQueryOptions,
    },
  );

  if (record && record.id && record.id != id) {
    throw new Error(
      `useShowController: Fetched record's id attribute (${record.id}) must match the requested 'id' (${id})`,
    );
  }

  return {
    record,
    error,
    isLoading,
    isPending,
    isFetching,
    resource,
    refetch,
  } as ShowControllerResult<RecordType>;
};

export interface ShowControllerProps<RecordType extends RsRecord = any> {
  id: RecordType['id'];
  resource: string;
  queryOptions?: UseGetOneOptions<RecordType>;
}

export interface ShowControllerBaseResult<RecordType extends RsRecord = any> {
  record?: RecordType;
  isLoading: boolean;
  isFetching: boolean;
  resource: string;
  refetch?: UseGetOneHookValue<RecordType>['refetch'];
}

export interface ShowControllerLoadingResult<RecordType extends RsRecord = any>
  extends ShowControllerBaseResult<RecordType> {
  record: undefined;
  error: null;
  isPending: true;
}

export interface ShowControllerLoadingErrorResult<RecordType extends RsRecord = any, TError = Error>
  extends ShowControllerBaseResult<RecordType> {
  record: undefined;
  error: TError;
  isPending: false;
}

export interface ShowControllerRefetchErrorResult<RecordType extends RsRecord = any, TError = Error>
  extends ShowControllerBaseResult<RecordType> {
  record: RecordType;
  error: TError;
  isPending: false;
}

export interface ShowControllerSuccessResult<RecordType extends RsRecord = any>
  extends ShowControllerBaseResult<RecordType> {
  record: RecordType;
  error: null;
  isPending: false;
}

export type ShowControllerResult<RecordType extends RsRecord = any> =
  | ShowControllerSuccessResult<RecordType>
  | ShowControllerLoadingResult<RecordType>
  | ShowControllerRefetchErrorResult<RecordType>
  | ShowControllerLoadingErrorResult<RecordType>;
