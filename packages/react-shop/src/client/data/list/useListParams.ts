import { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import lodashDebounce from 'lodash/debounce';
import { usePathname, useSearchParams } from 'next/navigation';
import { useIsMounted } from '@hooks/helpers';
import type { FilterPayload, SortPayload } from '@type';
import {
  queryReducer,
  SET_FILTER,
  SET_PAGE,
  SET_PER_PAGE,
  SET_SORT,
  SORT_ASC,
} from './queryReducer';
import { getQuery, parseQueryFromLocation, removeEmpty } from '../utils';
import { useRedirect } from '../../router';
import { listParamsState, useAtom } from 'src/client/state';

export interface ListParamsOptions {
  resource: string;
  debounce?: number;
  sort?: SortPayload;
  perPage?: number;
  disableSyncWithLocation?: boolean;
  filterDefaultValues?: FilterPayload;
  storeKey?: string | false;
}

export const useListParams = ({
  resource,
  filterDefaultValues,
  perPage = 12,
  sort = defaultSort,
  debounce = 500,
  disableSyncWithLocation = true,
  storeKey = disableSyncWithLocation ? false : `${resource}.listParams`,
}: ListParamsOptions): [Parameters, Modifiers] => {
  const redirect = useRedirect();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams?.toString();

  const [localParams, setLocalParams] = useState(defaultParams);

  const [params, setParams] = useAtom(listParamsState(storeKey || `${resource}.listParams`));

  const tempParams = useRef<ListParams>();
  const isMounted = useIsMounted();

  const requestSignature = [
    search,
    resource,
    perPage,
    storeKey,
    disableSyncWithLocation,
    JSON.stringify(sort),
    JSON.stringify(filterDefaultValues),
    JSON.stringify(!storeKey ? localParams : params),
  ];

  const queryFromLocation = disableSyncWithLocation ? {} : parseQueryFromLocation({ search });

  const query = useMemo(
    () =>
      getQuery({
        queryFromLocation,
        sort,
        perPage,
        filterDefaultValues,
        params: !storeKey ? localParams : params,
      }),
    requestSignature,
  );

  useEffect(() => {
    if (Object.keys(queryFromLocation).length > 0) {
      setParams(query);
    }
  }, [search]);

  const changeParams = useCallback(
    (action: any) => {
      if (!isMounted.current) {
        return;
      }

      if (!tempParams.current) {
        tempParams.current = queryReducer(query, action);

        setTimeout(() => {
          if (!tempParams.current) {
            return;
          }
          if (disableSyncWithLocation && !storeKey) {
            setLocalParams(tempParams.current as ListParams);
          } else if (disableSyncWithLocation && !!storeKey) {
            setParams(tempParams.current as ListParams);
          } else {
            redirect({
              to: pathname,
              query: {
                ...tempParams.current,
                filter: JSON.stringify(tempParams.current?.filter),
              },
            });
          }
          tempParams.current = undefined;
        }, 0);
      } else {
        tempParams.current = queryReducer(tempParams.current, action);
      }
    },
    [...requestSignature, redirect],
  );

  const setSort = useCallback(
    (sort: SortPayload) =>
      changeParams({
        type: SET_SORT,
        payload: sort,
      }),
    [changeParams],
  );

  const setPage = useCallback(
    (newPage: number) =>
      changeParams({
        type: SET_PAGE,
        payload: newPage,
      }),
    [changeParams],
  );

  const setPerPage = useCallback(
    (newPerPage: number) =>
      changeParams({
        type: SET_PER_PAGE,
        payload: newPerPage,
      }),
    [changeParams],
  );

  const filterValues = query.filter || emptyObject;

  const debouncedSetFilters = lodashDebounce((filter: any) => {
    changeParams({
      type: SET_FILTER,
      payload: {
        filter: removeEmpty(filter),
      },
    });
  }, debounce);

  const setFilters = useCallback(
    (filter: any, debounce?: boolean) =>
      debounce
        ? debouncedSetFilters(filter)
        : changeParams({
            type: SET_FILTER,
            payload: {
              filter: removeEmpty(filter),
            },
          }),

    [changeParams],
  );

  return [
    { filterValues, requestSignature, ...query },
    {
      changeParams,
      setSort,
      setPage,
      setPerPage,
      setFilters,
    },
  ];
};

export interface Modifiers {
  changeParams: (action: any) => void;
  setPage: (page: number) => void;
  setPerPage: (pageSize: number) => void;
  setSort: (sort: SortPayload) => void;
  setFilters: (filters: any, debounce?: boolean) => void;
}

export interface ListParams {
  sort: string;
  order: string;
  page: number;
  perPage: number;
  filter: any;
  filterValues?: object;
}

interface Parameters extends ListParams {
  requestSignature: any;
  filterValues: object;
}

const emptyObject = {};

const defaultSort = {
  field: 'id',
  order: SORT_ASC,
} as SortPayload;

const defaultParams = {};
