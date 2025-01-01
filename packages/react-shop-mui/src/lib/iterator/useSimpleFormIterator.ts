import { useContext } from 'react';
import {
  SimpleFormIteratorContext,
  SimpleFormIteratorContextValue,
} from './SimpleFormIteratorContext';

export const useSimpleFormIterator = (): SimpleFormIteratorContextValue => {
  const context = useContext(SimpleFormIteratorContext);

  if (!context) {
    throw new Error('useSimpleFormIterator must be used inside SimpleFormIterator');
  }

  return context;
};
