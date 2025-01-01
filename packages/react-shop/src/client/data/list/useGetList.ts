import { useMemo, useEffect, useRef } from 'react';
import type { RsRecord } from 'react-shop-types';
import { useQuery, UseQueryOptions, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useDataProvider } from '../useDataProvider';
import { useEvent } from '@hooks/useEvent';
import type { GetListParams, GetListResult } from '@type/data';

const MAX_DATA_LENGTH_TO_CACHE = 100;

export const useGetList = <RecordType extends RsRecord = any>(
  resource: string,
  params: Partial<GetListParams> = {},
  options: UseGetListOptions<RecordType> = {},
): UseGetListHookValue<RecordType> => {
  const {
    pagination = { page: 1, perPage: 12 },
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

  const result = useQuery<GetListResult<RecordType>, Error, GetListResult<RecordType>>({
    queryKey: [resource, 'getList', { pagination, sort, filter, meta }],
    queryFn: () =>
      dataProvider
        .getList<RecordType>(resource, {
          pagination,
          sort,
          filter,
          meta,
        })
        .then(({ data, total, pageInfo }) => ({
          data,
          total,
          pageInfo,
        })),
    ...queryOptions,
  });

  const metaValue = useRef(meta);
  const resourceValue = useRef(resource);

  useEffect(() => {
    metaValue.current = meta;
  }, [meta]);

  useEffect(() => {
    resourceValue.current = resource;
  }, [resource]);

  useEffect(() => {
    if (result.data === undefined || result.error != null || result.isFetching) {
      return;
    }
    if (result.data?.data && result.data.data.length <= MAX_DATA_LENGTH_TO_CACHE) {
      result.data.data.forEach(record => {
        queryClient.setQueryData(
          [resourceValue.current, 'getOne', { id: String(record.id), meta: metaValue.current }],
          oldRecord => oldRecord ?? record,
        );
      });
    }

    onSuccessEvent(result.data);
  }, [onSuccessEvent, queryClient, result.data, result.error, result.isFetching]);

  useEffect(() => {
    if (result.error == null || result.isFetching) {
      return;
    }
    onErrorEvent(result.error);
  }, [onErrorEvent, result.isFetching, result.error]);

  useEffect(() => {
    if (result.status === 'pending' || result.isFetching) {
      return;
    }
    onSettledEvent(result.data, result.error);
  }, [onSettledEvent, result.data, result.error, result.status, result.isFetching]);

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

export type UseGetListOptions<RecordType extends RsRecord = any> = Omit<
  UseQueryOptions<GetListResult<RecordType>, Error>,
  'queryKey' | 'queryFn'
> & {
  onSuccess?: (value: GetListResult<RecordType>) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: GetListResult<RecordType>, error?: Error | null) => void;
};

export type UseGetListHookValue<RecordType extends RsRecord = any> = UseQueryResult<
  RecordType[],
  Error
> & {
  total?: number;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
};
