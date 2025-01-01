import { createContext } from 'react';
import { EditControllerResult } from '../controller/useEditController';

export const EditContext = createContext<EditControllerResult | null>(null);

EditContext.displayName = 'EditContext';
