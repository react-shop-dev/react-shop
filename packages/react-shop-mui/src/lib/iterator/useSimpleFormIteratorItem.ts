import { useContext } from 'react';
import {
  SimpleFormIteratorItemContext,
  SimpleFormIteratorItemContextValue,
} from './SimpleFormIteratorItemContext';

export const useSimpleFormIteratorItem = (): SimpleFormIteratorItemContextValue => {
  const context = useContext(SimpleFormIteratorItemContext);

  if (!context) {
    throw new Error('useSimpleFormIteratorItem must be used inside SimpleFormIteratorItem');
  }

  return context;
};
