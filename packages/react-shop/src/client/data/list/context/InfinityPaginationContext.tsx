import { createContext } from 'react';
import { InfiniteListControllerResult } from '@data/controller/useInfinityListController';

export const InfinitePaginationContext = createContext<InfinitePaginationContextValue>({
  hasNextPage: false,
  fetchNextPage: () => Promise.reject('not impemented'),
  isFetchingNextPage: false,
  hasPreviousPage: false,
  fetchPreviousPage: () => Promise.reject('not impemented'),
  isFetchingPreviousPage: false,
});

InfinitePaginationContext.displayName = 'InfinitePaginationContext';

export type InfinitePaginationContextValue = Pick<
  InfiniteListControllerResult,
  | 'fetchNextPage'
  | 'fetchPreviousPage'
  | 'isFetchingNextPage'
  | 'isFetchingPreviousPage'
  | 'hasNextPage'
  | 'hasPreviousPage'
>;
