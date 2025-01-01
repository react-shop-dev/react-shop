import { useContext } from 'react';
import { ListSortContext, ListSortContextValue } from './ListSortContext';

export const useListSortContext = (): ListSortContextValue => {
  const context = useContext(ListSortContext);

  if (!context) {
    throw new Error('useListSortContext must be used within a ListSortContextProvider');
  }

  return context;
};
