import { createContext } from 'react';
import { DataProvider } from 'src/types/data';

export const DataProviderContext = createContext<DataProvider | null>(null);

DataProviderContext.displayName = 'DataProviderContext';
