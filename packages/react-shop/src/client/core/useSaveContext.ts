import { useContext } from 'react';
import { SaveContext, SaveContextValue } from './SaveContext';

export const useSaveContext = <PropsType extends SaveContextValue = SaveContextValue>(
  _props?: PropsType,
): SaveContextValue | undefined => useContext(SaveContext);
