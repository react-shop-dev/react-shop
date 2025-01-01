import { createContext } from 'react';

export type SimpleFormIteratorContextValue = {
  add: () => void;
  remove: (index?: number) => void;
  source?: string;
  total: number;
  reOrder: (index: number, newIndex: number) => void;
};

export const SimpleFormIteratorContext = createContext<SimpleFormIteratorContextValue | undefined>(
  undefined,
);

SimpleFormIteratorContext.displayName = 'SimpleFormIteratorContext';
