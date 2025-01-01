import { useEffect, useMemo } from 'react';
import { QueryObserverResult, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuthProvider } from './useAuthProvider';
import { useInAuthContext } from './useInAuthContext';
import { useEvent } from '@hooks/useEvent';
import type { UserIdentity } from './AuthContext';

const defaultIdentity: UserIdentity = {
  id: '',
};

const defaultQueryParams = {
  staleTime: 5 * 60 * 1000,
};

export const useGetIdentity = <ErrorType extends Error = Error>(
  options: UseGetIdentityOptions<ErrorType> = defaultQueryParams,
): UseGetIdentityResult<ErrorType> => {
  const authProvider = useAuthProvider();
  const isAuthProviderExist = useInAuthContext();

  const { onSuccess, onSettled, onError, ...queryOptions } = options;

  const result = useQuery({
    queryKey: ['auth', 'getIdentity'],
    queryFn: () => {
      if (isAuthProviderExist && typeof authProvider.getIdentity === 'function') {
        return authProvider.getIdentity();
      } else {
        return defaultIdentity;
      }
    },
    ...queryOptions,
  });

  const onSuccessEvent = useEvent(onSuccess ?? noop);
  const onErrorEvent = useEvent(onError ?? noop);
  const onSettledEvent = useEvent(onSettled ?? noop);

  useEffect(() => {
    if (result.data === undefined || result.isFetching) {
      return;
    }
    onSuccessEvent(result.data);
  }, [onSuccessEvent, result.data, result.isFetching]);

  useEffect(() => {
    if (result.error == null || result.isFetching) {
      return;
    }
    onErrorEvent(result.error);
  }, [onErrorEvent, result.isFetching, result.error]);

  useEffect(() => {
    if (result.status === 'pending' || result.isFetching) {
      return;
    }
    onSettledEvent(result.data, result.error);
  }, [onSettledEvent, result.data, result.error, result.status, result.isFetching]);

  return useMemo(
    () => ({
      ...result,
      identity: result.data,
    }),
    [result],
  );
};

export type UseGetIdentityResult<ErrorType = Error> = QueryObserverResult<
  UserIdentity,
  ErrorType
> & {
  identity: UserIdentity | undefined;
};

export interface UseGetIdentityOptions<ErrorType extends Error = Error>
  extends Omit<UseQueryOptions<UserIdentity, ErrorType>, 'queryKey' | 'queryFn'> {
  onSuccess?: (data: UserIdentity) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: UserIdentity, error?: Error | null) => void;
}

const noop = () => {};
