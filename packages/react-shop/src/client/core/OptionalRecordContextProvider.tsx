import type { ReactElement } from 'react';
import type { RsRecord } from 'react-shop-types';
import { RecordContextProvider } from './RecordContextProvider';

export const OptionalRecordContextProvider = <
  RecordType extends RsRecord | Omit<RsRecord, 'id'> = RsRecord,
>({
  value,
  children,
}: {
  value?: RecordType;
  children: ReactElement;
}) => (value ? <RecordContextProvider value={value}>{children}</RecordContextProvider> : children);
