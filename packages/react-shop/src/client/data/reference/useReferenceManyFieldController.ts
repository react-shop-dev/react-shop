import { useCallback, useEffect, useRef } from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import lodashDebounce from 'lodash/debounce';
import type { RsRecord } from 'react-shop-types';
import type { SortPayload } from '@type';
import { ListControllerResult } from '../controller';
import { useGetManyReference } from './useGetManyReference';
import { usePaginationState } from '../list/usePaginationState';
import { useSortState } from '../list/useSortState';
import { useRecordSelection } from '../list';
import { useNotify } from '../../notification/useNotify';
import { useSafeSetState } from '@hooks/helpers';
import { removeEmpty } from '../utils';

export const useReferenceManyFieldController = <
  RecordType extends RsRecord = RsRecord,
  ReferenceRecordType extends RsRecord = RsRecord,
>(
  props: UseReferenceManyFieldControllerParams<RecordType>,
): ListControllerResult => {
  const {
    reference,
    target,
    record,
    source,
    page: initialPage,
    perPage: initialPerPage,
    sort: initialSort = { field: 'id', order: 'DESC' },
    filter = defaultFilter,
    debounce = 500,
  } = props;

  const notify = useNotify();

  // pagination logic
  const { page, perPage, setPage, setPerPage } = usePaginationState({
    page: initialPage,
    perPage: initialPerPage,
  });

  // sort logic
  const { sort, setSort: setSortState } = useSortState(initialSort);
  const setSort = useCallback(
    (sort: SortPayload) => {
      setSortState(sort);
      setPage(1);
    },
    [setPage, setSortState],
  );

  // selection logic
  const [selectedIds, selectionModifiers] = useRecordSelection();

  // filter logic
  const filterRef = useRef(filter);
  const [filterValues, setFilterValues] = useSafeSetState<{
    [key: string]: any;
  }>(filter);

  const debouncedSetFilters = useCallback(
    lodashDebounce((filters: any) => {
      setFilterValues(removeEmpty(filters));
      setPage(1);
    }, debounce),
    [setFilterValues, setPage],
  );

  const setFilters = useCallback(
    (filters: any, debounce = true) => {
      if (debounce) {
        debouncedSetFilters(filters);
      } else {
        setFilterValues(removeEmpty(filters));
        setPage(1);
      }
    },
    [setPage, setFilterValues],
  );

  useEffect(() => {
    if (!isEqual(filter, filterRef.current)) {
      filterRef.current = filter;
      setFilterValues(filter);
    }
  });

  const { data, total, pageInfo, error, isFetching, isPending, isLoading, refetch } =
    useGetManyReference<ReferenceRecordType>(
      reference,
      {
        target,
        id: get(record, source as string),
        pagination: { page, perPage },
        sort,
        filter: filterValues,
      },
      {
        placeholderData: previousData => previousData,
        enabled: get(record, source as string) != null,
        onError: error =>
          notify(typeof error === 'string' ? error : error.message || 'rs.message.http_error', {
            type: 'error',
            messageArgs: {
              _:
                typeof error === 'string'
                  ? error
                  : error && error.message
                    ? error.message
                    : undefined,
            },
          }),
      },
    );

  return {
    data,
    total,
    error,
    refetch,
    resource: reference,
    sort,
    setSort,
    isLoading,
    isPending,
    isFetching,
    page: Number(page),
    perPage: Number(perPage),
    setPage,
    setPerPage,
    filterValues,
    setFilters,
    selectedIds,
    onSelect: selectionModifiers.select,
    onClearItems: selectionModifiers.clearSelection,
    onToggleItem: selectionModifiers.toggle,
    onUnselectItems: selectionModifiers.unselect,
    hasNextPage: pageInfo
      ? pageInfo.hasNextPage
      : total != null
        ? Number(page) * Number(perPage) < total
        : undefined,
    hasPreviousPage: pageInfo ? pageInfo.hasPreviousPage : Number(page) > 1,
  } as ListControllerResult<RecordType>;
};

export interface UseReferenceManyFieldControllerParams<RecordType extends RsRecord = RsRecord> {
  reference: string;
  target: string;
  debounce?: number;
  source?: string;
  resource?: string;
  record?: RecordType;
  page?: number;
  perPage?: number;
  sort?: SortPayload;
  filter?: any;
}

const defaultFilter = {};
