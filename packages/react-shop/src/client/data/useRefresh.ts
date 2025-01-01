import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useRefresh = () => {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.invalidateQueries();
  }, [queryClient]);
};
