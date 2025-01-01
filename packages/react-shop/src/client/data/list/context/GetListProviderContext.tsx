import type { ReactNode } from 'react';
import { GetListContext } from './GetListContext';
import { ListControllerResult } from '@data/controller/useListController';
import { ListSortContext, usePickSortContext } from './ListSortContext';
import { ListPaginationContext, usePickPaginationContext } from './ListPaginationContext';
import { ListFilterContext, usePickFilterContext } from './ListFilterContext';

export interface GetListContextProviderProps {
  value: ListControllerResult;
  children: ReactNode;
}

export const GetListProviderContext = ({ value, children }: GetListContextProviderProps) => {
  return (
    <GetListContext.Provider value={value}>
      <ListFilterContext.Provider value={usePickFilterContext(value)}>
        <ListPaginationContext.Provider value={usePickPaginationContext(value)}>
          <ListSortContext.Provider value={usePickSortContext(value)}>
            {children}
          </ListSortContext.Provider>
        </ListPaginationContext.Provider>
      </ListFilterContext.Provider>
    </GetListContext.Provider>
  );
};
