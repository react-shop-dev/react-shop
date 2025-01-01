import { createContext } from 'react';
import type { ShowControllerResult } from '../controller/useShowController';

export const ShowContext = createContext<ShowControllerResult | null>(null);

ShowContext.displayName = 'ShowContext';
