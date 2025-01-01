import { useContext } from 'react';
import {
  InfinitePaginationContext,
  InfinitePaginationContextValue,
} from './InfinityPaginationContext';

export const useInfinitePaginationContext = (): InfinitePaginationContextValue =>
  useContext(InfinitePaginationContext);
