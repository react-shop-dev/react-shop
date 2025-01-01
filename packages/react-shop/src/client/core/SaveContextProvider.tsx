import type { ReactNode } from 'react';
import { SaveContext } from './SaveContext';

export const SaveContextProvider = ({ children, value }: { value: any; children: ReactNode }) => (
  <SaveContext.Provider value={value}>{children}</SaveContext.Provider>
);
