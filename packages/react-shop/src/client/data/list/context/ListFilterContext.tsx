import { createContext, useMemo } from 'react';
import pick from 'lodash/pick';
import { ListControllerResult } from '@data/controller/useListController';

export const ListFilterContext = createContext<ListFilterContextValue | undefined>(undefined);

ListFilterContext.displayName = 'ListFilterContext';

export type ListFilterContextValue = Pick<
  ListControllerResult,
  'setFilters' | 'filterValues' | 'resource'
>;

export const usePickFilterContext = (context: ListControllerResult): ListFilterContextValue =>
  useMemo(
    () => pick(context, ['setFilters', 'filterValues', 'resource']),

    [context.resource, context.filterValues, context.setFilters],
  );
