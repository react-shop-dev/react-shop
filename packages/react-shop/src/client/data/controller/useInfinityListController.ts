import { useMemo, useEffect } from 'react';
import { InfiniteQueryObserverBaseResult, InfiniteData } from '@tanstack/react-query';
import type { RsRecord } from 'react-shop-types';
import type { ListControllerResult } from './useListController';
import { ListParams, Modifiers } from '../list/useListParams';
import { useNotify } from '../../notification/useNotify';
import type { FilterPayload, SortPayload } from '@type';
import { useInfiniteGetList, UseInfiniteGetListOptions } from '../list/useInfinityGetList';
import type { GetInfiniteListResult } from '@type/data';
import { useProductInterface } from '@hooks/useProductInterface';

export const useInifinityListController = <RecordType extends RsRecord = any>(
  props: InfiniteListControllerProps<RecordType>,
): InfiniteListControllerResult<RecordType> => {
  const { resource: resourceDefault } = useProductInterface();

  const {
    resource = resourceDefault,
    listParams,
    queryModifiers,
    filter,
    queryOptions,
  } = props ?? {};

  const { meta, ...otherQueryOptions } = queryOptions ?? {};

  const notify = useNotify();

  const {
    data,
    total,
    error,
    isLoading,
    isFetching,
    isPending,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    refetch,
  } = useInfiniteGetList<RecordType>(
    resource,
    {
      pagination: { page: listParams.page, perPage: listParams.perPage },
      sort: { field: listParams.sort, order: listParams.order } as SortPayload,
      filter: { ...listParams.filter, ...filter },
      meta,
    },
    {
      placeholderData: previousData => previousData,
      retry: false,
      onError: error => {
        notify(error?.message || 'rs.message.http_error', {
          type: 'error',
          messageArgs: {
            _: error?.message,
          },
        });
      },
      ...otherQueryOptions,
    },
  );

  useEffect(() => {
    if (
      listParams.page <= 0 ||
      (!isFetching && listParams.page > 1 && (data == null || data?.pages.length === 0))
    ) {
      queryModifiers.setPage(1);
      return;
    }

    if (total == null) {
      return;
    }
    const totalPages = Math.ceil(total / listParams.perPage) || 1;
    if (!isFetching && listParams.page > totalPages) {
      queryModifiers.setPage(totalPages);
    }
  }, [total, isFetching, data, listParams.perPage, listParams.page, queryModifiers]);

  const currentSort = useMemo(
    () => ({
      field: listParams.sort,
      order: listParams.order,
    }),
    [listParams.order, listParams.sort],
  ) as SortPayload;

  const unwrappedData = useMemo(
    () => data?.pages.reduce<RecordType[]>((acc, page) => [...acc, ...page.data], []),
    [data],
  );

  return {
    data: unwrappedData,
    total,
    error,
    sort: currentSort,
    setSort: queryModifiers.setSort,
    filter,
    filterValues: listParams.filterValues,
    setFilters: queryModifiers.setFilters,
    isLoading,
    isFetching,
    isPending,
    page: listParams.page,
    perPage: listParams.perPage,
    setPage: queryModifiers.setPage,
    setPerPage: queryModifiers.setPerPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    refetch,
  } as InfiniteListControllerResult<RecordType>;
};

export interface InfiniteListControllerProps<RecordType extends RsRecord = any> {
  listParams: ListParams;
  resource?: string;
  queryModifiers: Modifiers;
  filter?: FilterPayload;
  queryOptions?: UseInfiniteGetListOptions<RecordType>;
}

export type InfiniteListControllerResult<RecordType extends RsRecord = any> =
  ListControllerResult<RecordType> & {
    fetchNextPage: InfiniteQueryObserverBaseResult<
      InfiniteData<GetInfiniteListResult<RecordType>>
    >['fetchNextPage'];
    isFetchingNextPage: InfiniteQueryObserverBaseResult<
      InfiniteData<GetInfiniteListResult<RecordType>>
    >['isFetchingNextPage'];
    fetchPreviousPage: InfiniteQueryObserverBaseResult<
      InfiniteData<GetInfiniteListResult<RecordType>>
    >['fetchPreviousPage'];
    isFetchingPreviousPage: InfiniteQueryObserverBaseResult<
      InfiniteData<GetInfiniteListResult<RecordType>>
    >['isFetchingPreviousPage'];
  };
