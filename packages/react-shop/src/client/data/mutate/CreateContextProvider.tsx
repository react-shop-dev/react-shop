import type { ReactNode } from 'react';
import { CreateContext } from './CreateContext';
import { CreateControllerResult } from '../controller/useCreateController';
import { RecordContextProvider } from '@core/RecordContextProvider';
import { SaveContextProvider } from '@core/SaveContextProvider';
import { usePickSaveContext } from '@core/SaveContext';

export const CreateContextProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: CreateControllerResult;
}) => (
  <CreateContext.Provider value={value}>
    <SaveContextProvider value={usePickSaveContext(value)}>
      <RecordContextProvider value={value && value.record}>{children}</RecordContextProvider>
    </SaveContextProvider>
  </CreateContext.Provider>
);
