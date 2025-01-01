import { useEffect, useRef } from 'react';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useQueryClient,
  InfiniteData,
  QueryKey,
} from '@tanstack/react-query';
import type { RsRecord } from 'react-shop-types';
import { useDataProvider } from '../useDataProvider';
import type { GetInfiniteListResult, GetListParams } from '@type/data';
import { useEvent } from '@hooks/useEvent';

const MAX_DATA_LENGTH_TO_CACHE = 100;

export const useInfiniteGetList = <RecordType extends RsRecord = any>(
  resource: string,
  params: Partial<GetListParams> = {},
  options: UseInfiniteGetListOptions<RecordType> = {},
): UseInifiteGetListHookValue<RecordType> => {
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

  const result = useInfiniteQuery<
    GetInfiniteListResult<RecordType>,
    Error,
    InfiniteData<GetInfiniteListResult<RecordType>>,
    QueryKey,
    number
  >({
    queryKey: [resource, 'getInfiniteList', { pagination, sort, filter, meta }],
    queryFn: queryParams => {
      const { pageParam = pagination.page } = queryParams;
      return dataProvider
        .getList<RecordType>(resource, {
          pagination: { page: pageParam, perPage: pagination.perPage },
          sort,
          filter,
          meta,
        })
        .then(({ data, pageInfo, total }) => ({
          data,
          total,
          pageParam,
          pageInfo,
        }));
    },
    initialPageParam: pagination.page,
    ...queryOptions,
    getNextPageParam: lastLoadedPage => {
      if (lastLoadedPage.pageInfo) {
        return lastLoadedPage.pageInfo.hasNextPage
          ? Number(lastLoadedPage.pageParam) + 1
          : undefined;
      }
      const totalPages = Math.ceil((lastLoadedPage.total || 0) / pagination.perPage);
      return Number(lastLoadedPage.pageParam) < totalPages
        ? Number(lastLoadedPage.pageParam) + 1
        : undefined;
    },
    getPreviousPageParam: lastLoadedPage => {
      if (lastLoadedPage.pageInfo) {
        return lastLoadedPage.pageInfo.hasPreviousPage
          ? Number(lastLoadedPage.pageParam) - 1
          : undefined;
      }
      return lastLoadedPage.pageParam === 1 ? undefined : Number(lastLoadedPage.pageParam) - 1;
    },
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
    // optimistically populate the get one cache
    const allPagesDataLength = result.data.pages.reduce((acc, page) => acc + page.data.length, 0);

    if (allPagesDataLength <= MAX_DATA_LENGTH_TO_CACHE) {
      result.data.pages.forEach(page => {
        page.data.forEach(record => {
          queryClient.setQueryData(
            [resourceValue.current, 'getOne', { id: String(record.id), meta: metaValue.current }],
            oldRecord => oldRecord ?? record,
          );
        });
      });
    }

    onSuccessEvent(result.data);
  }, [queryClient, onSuccessEvent, result.data, result.error, result.isFetching]);

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

  return (
    result.data
      ? { ...result, data: result.data, total: result.data?.pages[0]?.total ?? undefined }
      : result
  ) as UseInfiniteQueryResult<InfiniteData<GetInfiniteListResult<RecordType>>, Error> & {
    total?: number;
  };
};

const noop = () => undefined;

export type UseInfiniteGetListOptions<RecordType extends RsRecord = any> = Omit<
  UseInfiniteQueryOptions<
    GetInfiniteListResult<RecordType>,
    Error,
    InfiniteData<GetInfiniteListResult<RecordType>>,
    GetInfiniteListResult<RecordType>,
    QueryKey,
    number
  >,
  'queryKey' | 'queryFn' | 'getNextPageParam' | 'getPreviousPageParam' | 'initialPageParam'
> & {
  onSuccess?: (data: InfiniteData<GetInfiniteListResult<RecordType>>) => void;
  onError?: (error: Error) => void;
  onSettled?: (
    data?: InfiniteData<GetInfiniteListResult<RecordType>>,
    error?: Error | null,
  ) => void;
};

export type UseInifiteGetListHookValue<RecordType extends RsRecord = any> = UseInfiniteQueryResult<
  InfiniteData<GetInfiniteListResult<RecordType>>
> & {
  total?: number;
  pageParam?: number;
};
