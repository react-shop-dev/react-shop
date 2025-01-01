import { createContext } from 'react';

export type SimpleFormIteratorItemContextValue = {
  index: number;
  total: number;
  remove: () => void;
  reOrder: (newIndex: number) => void;
};

export const SimpleFormIteratorItemContext = createContext<
  SimpleFormIteratorItemContextValue | undefined
>(undefined);
