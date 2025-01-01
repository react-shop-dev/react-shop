import { useContext } from 'react';
import { ListFilterContext, ListFilterContextValue } from './ListFilterContext';

export const useListFilterContext = (): ListFilterContextValue => {
  const context = useContext(ListFilterContext);

  if (!context) {
    throw new Error('useListFilterContext must be used within a ListFilterContextProvider');
  }

  return context;
};
