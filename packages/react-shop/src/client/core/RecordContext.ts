import { createContext } from 'react';
import type { RsRecord } from 'react-shop-types';

export const RecordContext = createContext<RsRecord | Omit<RsRecord, 'id'> | undefined>(undefined);

RecordContext.displayName = 'RecordContext';
