import { createContext } from 'react';
import { ListControllerResult } from '@data/controller/useListController';

export const GetListContext = createContext<ListControllerResult | null>(null);

GetListContext.displayName = 'GetListContext';
