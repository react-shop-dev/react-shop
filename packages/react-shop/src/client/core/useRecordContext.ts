import { useContext } from 'react';
import type { RsRecord } from 'react-shop-types';
import { RecordContext } from './RecordContext';

export const useRecordContext = <RecordType extends RsRecord | Omit<RsRecord, 'id'> = RsRecord>(
  props?: UseRecordContextParams<RecordType>,
): RecordType | undefined => {
  // @ts-ignore RecordContext
  const context = useContext<RecordType | undefined>(RecordContext);

  return (props && props.record) || context;
};

export interface UseRecordContextParams<
  Recordtype extends RsRecord | Omit<RsRecord, 'id'> = RsRecord,
> {
  record?: Recordtype;
  [key: string]: any;
}
