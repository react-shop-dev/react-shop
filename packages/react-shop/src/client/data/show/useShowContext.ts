import { useContext } from 'react';
import type { RsRecord } from 'react-shop-types';
import { ShowContext } from './ShowContext';
import type { ShowControllerResult } from '../controller';

export const useShowContext = <
  RecordType extends RsRecord = any,
>(): ShowControllerResult<RecordType> => {
  const context = useContext(ShowContext);

  if (!context) {
    throw new Error('useShowContext must be used inside a ShowContextProvider');
  }

  return context;
};
