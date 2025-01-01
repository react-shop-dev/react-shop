import { useContext } from 'react';
import { ListPaginationContext, ListPaginationContextValue } from './ListPaginationContext';

export const useListPaginationContext = (): ListPaginationContextValue => {
  const context = useContext(ListPaginationContext);

  if (!context) {
    throw new Error('useListPaginationContext must be used inside a ListPaginationContextProvider');
  }

  return context;
};
