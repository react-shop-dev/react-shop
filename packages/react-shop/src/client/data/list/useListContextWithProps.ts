import { useContext, useMemo } from 'react';
import defaults from 'lodash/defaults';
import type { RsRecord } from 'react-shop-types';
import { GetListContext } from './context/GetListContext';
import type { ListControllerResult } from '../controller';

export const useListContextWithProps = <RecordType extends RsRecord = any>(
  props?: any,
): ListControllerResult<RecordType> => {
  const context = useContext(GetListContext);

  if (!context) {
    throw new Error('useListContext nust be used inside a ListContextProvider');
  }

  return useMemo(
    () => defaults({}, props != null ? extractListContextProps(props) : {}, context),
    [context],
  );
};

const extractListContextProps = <RecordType extends RsRecord = any>({
  data,
  total,
  sort,
  isLoading,
  isPending,
  isFetching,
  page,
  perPage,
  setPage,
  setPerPage,
  setSort,
  filterValues,
  setFilters,
  onSelect,
  onToggleItem,
  onClearItems,
  onUnselectItems,
  selectedIds,
  refetch,
  resource,
}: Partial<ListControllerResult<RecordType>> & Record<string, any>) => ({
  data,
  total,
  sort,
  isLoading,
  isPending,
  page,
  perPage,
  setPage,
  setPerPage,
  isFetching,
  setSort,
  onSelect,
  filterValues,
  setFilters,
  onToggleItem,
  onClearItems,
  onUnselectItems,
  selectedIds,
  refetch,
  resource,
});
