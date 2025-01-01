import { useContext } from 'react';
import type { RsRecord } from 'react-shop-types';
import { GetListContext } from './context/GetListContext';
import type { ListControllerResult } from '@data/controller';

export const useListContext = <
  RecordType extends RsRecord = any,
>(): ListControllerResult<RecordType> => {
  const context = useContext(GetListContext);
  if (!context) {
    throw new Error('useListContext must be used inside GetListContextProvider');
  }
  return context;
};
