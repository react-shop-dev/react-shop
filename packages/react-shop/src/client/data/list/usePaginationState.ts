import { useEffect, useReducer, useCallback, useRef } from 'react';
import { PaginationPayload } from 'src/types';

const paginationReducer = (
  prevState: PaginationPayload,
  nextState: Partial<PaginationPayload>,
): PaginationPayload => {
  return {
    ...prevState,
    ...nextState,
  };
};

export const usePaginationState = (
  initialPagination: { page?: number; perPage?: number } = {},
): PaginationHookResult => {
  const [pagination, setPagination] = useReducer(paginationReducer, {
    ...defaultPagination,
    ...initialPagination,
  });

  const isFirstRender = useRef(true);

  const setPage = useCallback((page: number) => setPagination({ page }), []);

  const setPerPage = useCallback((perPage: number) => setPagination({ perPage, page: 1 }), []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPerPage(initialPagination.perPage || 25);
  }, [setPerPage, initialPagination.perPage]);

  return {
    page: pagination.page,
    perPage: pagination.perPage,
    pagination,
    setPage,
    setPerPage,
    setPagination,
  };
};

const defaultPagination = {
  page: 1,
  perPage: 25,
};

export interface PaginationHookResult {
  page: number;
  perPage: number;
  pagination: PaginationPayload;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setPagination: (pagination: PaginationPayload) => void;
}
