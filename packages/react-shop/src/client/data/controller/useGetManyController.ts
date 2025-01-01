import type { Identifier } from 'react-shop-types';
import type { ListControllerResult } from './useListController';
import type { SortPayload } from '@type';
import { useGetManyAggregate } from '../list/useGetManyAggregate';
import { useRecordSelection } from '../list/useRecordSelection';

export interface UseGetManyControllerParams {
  resource: string;
  page?: number;
  perPage?: number;
  ids: Identifier[];
}

export const useGetManyController = (
  props: UseGetManyControllerParams,
): UseGetManyControllerResult => {
  const { resource, page = 1, perPage = 50, ids } = props;

  const [selectedIds, selectionModifiers] = useRecordSelection();

  const { data, error, isLoading, isPending, isFetching } = useGetManyAggregate(resource, { ids });

  return {
    data,
    error,
    isLoading,
    isFetching,
    isPending,
    selectedIds,
    page,
    perPage,
    onSelect: selectionModifiers.select,
    onToggleItem: selectionModifiers.toggle,
    onClearItems: selectionModifiers.clearSelection,
    onUnselectItems: selectionModifiers.unselect,
    filter: {},
    sort: defaultSort,
    filterValues: {},
    setPage: () => undefined,
    setPerPage: () => undefined,
    setSort: () => undefined,
    setFilters: () => undefined,
  };
};

export type UseGetManyControllerResult = Omit<ListControllerResult, 'total'>;

const defaultSort = { field: 'id', order: 'ASC' } as SortPayload;
