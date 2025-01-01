import { createContext, useMemo } from 'react';
import pick from 'lodash/pick';
import { ListControllerResult } from '@data/controller/useListController';

export const ListPaginationContext = createContext<ListPaginationContextValue | undefined>(
  undefined,
);

ListPaginationContext.displayName = 'ListPaginationContext';

export type ListPaginationContextValue = Pick<
  ListControllerResult,
  | 'isLoading'
  | 'isPending'
  | 'page'
  | 'setPage'
  | 'perPage'
  | 'setPerPage'
  | 'total'
  | 'resource'
  | 'hasNextPage'
  | 'hasPreviousPage'
>;

export const usePickPaginationContext = (
  context: ListControllerResult,
): ListPaginationContextValue =>
  useMemo(
    () =>
      pick(context, [
        'isLoading',
        'isPending',
        'hasNextPage',
        'hasPreviousPage',
        'page',
        'perPage',
        'setPage',
        'setPerPage',
        'total',
        'resource',
      ]),

    [
      context.isLoading,
      context.isPending,
      context.hasNextPage,
      context.hasPreviousPage,
      context.page,
      context.perPage,
      context.setPage,
      context.setPerPage,
      context.total,
      context.resource,
    ],
  );
