import { createContext } from 'react';
import { CreateControllerResult } from '../controller/useCreateController';

export const CreateContext = createContext<CreateControllerResult | null>(null);

CreateContext.displayName = 'CreateContext';
