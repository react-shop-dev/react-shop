import type { ReactNode } from 'react';
import type { RsRecord } from 'react-shop-types';
import { RecordContext } from './RecordContext';

export const RecordContextProvider = <
  RecordType extends RsRecord | Omit<RsRecord, 'id'> = RsRecord,
>({
  children,
  value,
}: RecordContextProviderProps<RecordType>) => (
  <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
);

export interface RecordContextProviderProps<RecordType> {
  children: ReactNode;
  value?: RecordType;
}
