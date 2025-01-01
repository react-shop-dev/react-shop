import type { ReactNode } from 'react';
import { EditContext } from './EditContext';
import { EditControllerResult } from '../controller/useEditController';
import { RecordContextProvider } from '@core/RecordContextProvider';
import { SaveContextProvider } from '@core/SaveContextProvider';
import { usePickSaveContext } from '@core/SaveContext';

export const EditContextProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: EditControllerResult;
}) => (
  <EditContext.Provider value={value}>
    <SaveContextProvider value={usePickSaveContext(value)}>
      <RecordContextProvider value={value && value.record}>{children}</RecordContextProvider>
    </SaveContextProvider>
  </EditContext.Provider>
);
