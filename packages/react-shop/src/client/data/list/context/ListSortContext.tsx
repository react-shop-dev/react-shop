import { createContext, useMemo } from 'react';
import pick from 'lodash/pick';
import { ListControllerResult } from '@data/controller/useListController';

export const ListSortContext = createContext<ListSortContextValue | undefined>(undefined);

export type ListSortContextValue = Pick<ListControllerResult, 'sort' | 'setSort' | 'resource'>;

export const usePickSortContext = (context: ListControllerResult): ListSortContextValue =>
  useMemo(() => pick(context, ['sort', 'setSort', 'resource']), [context.sort, context.setSort]);

ListSortContext.displayName = 'ListSortContext';
