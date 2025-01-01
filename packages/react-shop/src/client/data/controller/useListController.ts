import { useMemo, useEffect } from 'react';
import type { Identifier, RsRecord } from 'react-shop-types';
import type { ListParams, Modifiers } from '../list/useListParams';
import { useNotify } from '../../notification/useNotify';
import type { FilterPayload, SortPayload } from '@type';
import { UseGetListHookValue, UseGetListOptions, useGetList } from '../list/useGetList';
import { useProductInterface } from '@hooks/useProductInterface';

export interface ListControllerProps<RecordType extends RsRecord = any> {
  listParams: ListParams;
  resource?: string;
  queryModifiers: Modifiers;
  filter?: FilterPayload;
  queryOptions?: UseGetListOptions<RecordType>;
}

export const useListController = <RecordType extends RsRecord = any>(
  props: ListControllerProps<RecordType>,
): ListControllerResult<RecordType> => {
  const { resource: resourceDefault } = useProductInterface();

  const {
    resource = resourceDefault,
    filter,
    listParams,
    queryModifiers,
    queryOptions = {},
  } = props;

  const notify = useNotify();

  const { meta, ...otherQueryOptions } = queryOptions;

  const { data, total, isLoading, isPending, isFetching, error, pageInfo, refetch } = useGetList(
    resource,
    {
      pagination: { page: listParams.page, perPage: listParams.perPage },
      sort: { field: listParams.sort, order: listParams.order } as SortPayload,
      filter: { ...listParams.filter, ...filter },
      meta,
    },
    {
      retry: false,
      placeholderData: previousData => previousData,
      refetchOnWindowFocus: false,
      onError: error => {
        notify(error?.message || 'Network error. Please retry', {
          type: 'error',
        });
      },
      ...otherQueryOptions,
    },
  );

  useEffect(() => {
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

  return {
    resource,
    data,
    total,
    isLoading,
    isPending,
    isFetching,
    error,
    refetch,
    sort: currentSort,
    setSort: queryModifiers.setSort,
    filter,
    filterValues: listParams.filterValues,
    setFilters: queryModifiers.setFilters,
    page: listParams.page,
    perPage: listParams.perPage,
    setPage: queryModifiers.setPage,
    setPerPage: queryModifiers.setPerPage,
    hasNextPage: pageInfo
      ? pageInfo.hasNextPage
      : total != null
        ? listParams.page * listParams.perPage < total
        : undefined,
    hasPreviousPage: pageInfo ? pageInfo.hasPreviousPage : listParams.page > 1,
  } as ListControllerResult<RecordType>;
};

export interface ListControllerBaseResult<RecordType extends RsRecord = any> {
  resource?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  sort: SortPayload;
  page: number;
  perPage: number;
  setPage: (page: number) => void;
  setSort: (sort: SortPayload) => void;
  setPerPage: (page: number) => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  filter?: FilterPayload;
  filterValues: any;
  setFilters: (filters: any, debounce?: boolean) => void;
  onSelect?: (ids: Identifier[]) => void;
  onToggleItem?: (id: Identifier) => void;
  onUnselectItems?: (ids: Identifier[]) => void;
  onClearItems?: () => void;
  selectedIds?: RecordType['id'][];
  refetch?: (() => void) | UseGetListHookValue<RecordType>['refetch'];
  isWishlist?: boolean;
}

export interface ListControllerSuccessResult<RecordType extends RsRecord = any>
  extends ListControllerBaseResult<RecordType> {
  data: RecordType[];
  total: number;
  error: null;
  isPending: false;
}

export interface ListControllerRefetchErrorResult<RecordType extends RsRecord = any, TError = Error>
  extends ListControllerBaseResult<RecordType> {
  data: RecordType[];
  total: number;
  error: TError;
  isPending: false;
}

export interface ListControllerErrorResult<RecordType extends RsRecord = any, TError = Error>
  extends ListControllerBaseResult<RecordType> {
  data: undefined;
  total: undefined;
  error: TError;
  isPending: false;
}

export interface ListControllerLoadingResult<RecordType extends RsRecord = any>
  extends ListControllerBaseResult<RecordType> {
  data: undefined;
  total: undefined;
  error: null;
  isPending: true;
}

export type ListControllerResult<RecordType extends RsRecord = any> =
  | ListControllerSuccessResult<RecordType>
  | ListControllerErrorResult<RecordType>
  | ListControllerLoadingResult<RecordType>
  | ListControllerRefetchErrorResult<RecordType>;
