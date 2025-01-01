import { useState, useRef, useEffect, useCallback } from 'react';
import { QueryObserverResult, UseQueryOptions } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
import unionWith from 'lodash/unionWith';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import type { RsRecord } from 'react-shop-types';
import type { FilterPayload, SortPayload } from '@type';
import { useGetList } from '@data/list/useGetList';
import { useReference } from '@data/reference/useReference';

export interface UseAutocompleteProps {
  source: string;
  reference: string;
  sort?: SortPayload;
  filter?: FilterPayload;
  debounce?: number;
  page?: number;
  perPage?: number;
  optionValue?: string;
  optionText?: string;
  filterToQuery?: (searchText: string) => any;
  enableGetChoices?: (filters: any) => boolean;
  queryOptions?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'> & {
    onSuccess?: (value: any) => void;
    onError?: (error: Error) => void;
    onSettled?: (data?: any, error?: Error | null) => void;
  };
  onSearch?: (value?: string) => any;
}

export const useAutocomplete = (props: UseAutocompleteProps) => {
  const {
    source,
    reference,
    page: inititalPage = 1,
    perPage: inititalPerPage = 5,
    sort: initialSort = defaultSort,
    debounce: debounceValue = 500,
    filter,
    filterToQuery = defaultFilterToQuery,
    optionText = 'name',
    enableGetChoices,
    queryOptions,
    onSearch: onSearchProp,
  } = props;

  const currentValue = useWatch({ name: source });
  const currentValueRef = useRef(currentValue);
  const [search, setSearch] = useState('');
  const [referenceRecord, setReferenceRecord] = useState<RsRecord | null>(null);

  const queryResult = useGetList(
    reference,
    {
      pagination: { page: inititalPage, perPage: inititalPerPage },
      sort: { field: initialSort.field, order: initialSort.order },
      filter: { ...filter, ...filterToQuery(search) },
    },
    {
      enabled: enableGetChoices ? enableGetChoices(search) : true,
      placeholderData: previousData => previousData,
      onSuccess: queryOptions?.onSuccess,
      onSettled: queryOptions?.onSettled,
      onError: queryOptions?.onError,
    },
  );

  const valueQueryResult = useReference({
    reference,
    id: currentValue,
    options: {
      enabled: currentValue != null && currentValue !== '',
      onSuccess: (data: any) => {
        data && setReferenceRecord(data[0]);
      },
    },
  });

  const onSearch = debounce((value: string) => {
    if (onSearchProp) {
      setSearch(onSearchProp(value));
      return;
    }
    if (!value) {
      setSearch('');
    } else {
      setSearch(value);
    }
  }, debounceValue);

  useEffect(() => {
    if (!isEqual(currentValueRef.current, currentValue)) {
      currentValueRef.current = currentValue;
      setSearch('');
    }
  }, [currentValue]);

  const options = unionWith(
    queryResult.data || [],
    referenceRecord ? [referenceRecord] : [],
    isEqual,
  ).filter(option => Boolean(option[optionText]));

  const refetch = useCallback(() => {
    queryResult.refetch();
    valueQueryResult.refetch();
  }, [queryResult, valueQueryResult]);

  const isLoading =
    (queryResult.isPending || valueQueryResult.isPending) && (!options || options.length === 0);

  return {
    options,
    isLoading,
    total: referenceRecord && queryResult.total ? queryResult.total + 1 : queryResult.total,
    onSearch,
    fetchError: queryResult.error || valueQueryResult.error,
    isFetching: queryResult.isFetching || queryResult.isFetching,
    refetch,
    referenceRecord,
  };
};

export interface UseAutocompleteResult {
  isLoading?: boolean;
  isFetching?: boolean;
  total?: number;
  referenceRecord?: RsRecord;
  fetchError?: Error;
  options: any[];
  onSearch: (value: string) => void;
  refetch?: () => Promise<QueryObserverResult>;
}

const defaultFilterToQuery = (searchText: string) => ({ q: searchText });

const defaultSort = { field: 'id', order: 'ASC' } as SortPayload;
