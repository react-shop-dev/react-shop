import { createContext } from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';

export type ArrayInputContextValue = UseFieldArrayReturn;

export const ArrayInputContext = createContext<ArrayInputContextValue | undefined>(undefined);

ArrayInputContext.displayName = 'ArrayInputContext';
