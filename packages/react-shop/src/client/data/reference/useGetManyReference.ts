import { useMemo, useEffect } from 'react';
import { useQueryClient, useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import type { RsRecord } from 'react-shop-types';
import { useDataProvider } from '../useDataProvider';
import { useEvent } from '@hooks/useEvent';
import type { GetManyReferenceParams, GetManyReferenceResult } from '@type/data';

export const useGetManyReference = <RecordType extends RsRecord = any>(
  resource: string,
  params: Partial<GetManyReferenceParams> = {},
  options: UseGetManyReferenceHookOptions<RecordType> = {},
): UseGetManyReferenceHookValue<RecordType> => {
  const {
    target,
    id,
    pagination = { page: 1, perPage: 25 },
    sort = { field: 'id', order: 'DESC' },
    filter = {},
    meta,
  } = params;

  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();

  const { onSuccess = noop, onError = noop, onSettled = noop, ...queryOptions } = options;

  const onSuccessEvent = useEvent(onSuccess);
  const onErrorEvent = useEvent(onError);
  const onSettledEvent = useEvent(onSettled);

  const result = useQuery<
    GetManyReferenceResult<RecordType>,
    Error,
    GetManyReferenceResult<RecordType>
  >({
    queryKey: [resource, 'getManyReference', { target, id, pagination, sort, filter, meta }],
    queryFn: () => {
      if (!target || id == null) {
        return Promise.reject(new Error('target and id are required'));
      }
      return dataProvider
        .getManyReference<RecordType>(resource, {
          target,
          id,
          pagination,
          sort,
          filter,
          meta,
        })
        .then(({ data, total, pageInfo }) => ({ data, total, pageInfo }));
    },
    ...queryOptions,
  });

  useEffect(() => {
    if (result.data === undefined) {
      return;
    }
    result?.data?.data?.forEach(record => {
      queryClient.setQueryData(
        [resource, 'getOne', { id: String(record.id), meta }],
        oldRecord => oldRecord ?? record,
      );
    });
    onSuccessEvent(result.data);
  }, [queryClient, meta, onSuccessEvent, resource, result.data]);

  useEffect(() => {
    if (result.error == null) {
      return;
    }
    onErrorEvent(result.error);
  }, [onErrorEvent, result.error]);

  useEffect(() => {
    if (result.status === 'pending') {
      return;
    }
    onSettledEvent(result.data, result.error);
  }, [onSettledEvent, result.data, result.error, result.status]);

  return useMemo(
    () =>
      result.data
        ? {
            ...result,
            data: result.data?.data,
            total: result.data?.total,
            pageInfo: result.data?.pageInfo,
          }
        : result,
    [result],
  ) as UseQueryResult<RecordType[], Error> & {
    total?: number;
    pageInfo?: {
      hasNextPage?: boolean;
      hasPreviousPage?: boolean;
    };
  };
};

const noop = () => undefined;

export type UseGetManyReferenceHookOptions<RecordType extends RsRecord = any> = Omit<
  UseQueryOptions<GetManyReferenceResult<RecordType>>,
  'queryKey' | 'queryFn'
> & {
  onSuccess?: (data: GetManyReferenceResult<RecordType>) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: GetManyReferenceResult<RecordType>, error?: Error | null) => void;
};

export type UseGetManyReferenceHookValue<RecordType extends RsRecord = any> = UseQueryResult<
  RecordType[]
> & {
  total?: number;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
};
