import { useEffect, useMemo } from 'react';
import { useQuery, QueryObserverResult, UseQueryOptions } from '@tanstack/react-query';
import { useSignOut } from './useSignOut';
import { useAuthProvider } from './useAuthProvider';
import { useInAuthContext } from './useInAuthContext';
import { useEvent } from '@hooks/useEvent';

const emptyParams = {};

export interface UseAuthStateParams extends Record<string, any> {
  required?: boolean;
  redirectTo?: string;
  onUnauthenticated?: () => void;
}

export const useAuthState = <ErrorType = Error>(
  params: UseAuthStateParams = emptyParams,
  queryOptions: UseAuthStateOptions<ErrorType> = emptyParams,
): UseAuthStateResult<ErrorType> => {
  const { logout } = useSignOut();
  const authProvider = useAuthProvider();
  const isAuthProviderExist = useInAuthContext();

  const { required, redirectTo, ...restParams } = params;
  const { onSuccess, onSettled, onError, ...options } = queryOptions;

  const queryResult = useQuery<boolean, any>({
    queryKey: ['auth', 'checkAuth', params],
    queryFn: () => {
      if (!isAuthProviderExist) {
        return true;
      }
      return authProvider
        .checkAuth({
          required,
          onUnauthenticated: () => (required ? logout(redirectTo) : undefined),
          ...restParams,
        })
        .then(() => true)
        .catch(error => {
          if (error != null) {
            throw error;
          }
          throw new Error();
        });
    },
    retry: false,
    ...options,
  });

  const onSuccessEvent = useEvent(onSuccess ?? noop);
  const onErrorEvent = useEvent(onError ?? noop);
  const onSettledEvent = useEvent(onSettled ?? noop);

  useEffect(() => {
    if (queryResult.data === undefined || queryResult.isFetching) {
      return;
    }
    if (queryOptions.enabled === false) {
      return;
    }
    onSuccessEvent(queryResult.data);
  }, [onSuccessEvent, queryResult.data, queryResult.isFetching, queryOptions.enabled]);

  useEffect(() => {
    if (queryResult.error == null || queryResult.isFetching) {
      return;
    }
    if (queryOptions.enabled === false) {
      return;
    }
    onErrorEvent(queryResult.error);
  }, [onErrorEvent, queryResult.isFetching, queryResult.error, queryOptions.enabled]);

  useEffect(() => {
    if (queryResult.status === 'pending' || queryResult.isFetching) {
      return;
    }
    if (queryOptions.enabled === false) {
      return;
    }
    onSettledEvent(queryResult.data, queryResult.error);
  }, [
    onSettledEvent,
    queryResult.data,
    queryResult.error,
    queryResult.status,
    queryResult.isFetching,
    queryOptions.enabled,
  ]);

  const result = useMemo(() => {
    return {
      ...queryResult,
      authenticated: queryResult.error ? false : (queryResult.data as boolean),
    };
  }, [queryResult]);

  return isAuthProviderExist
    ? result
    : (noAuthProviderQueryResult as UseAuthStateResult<ErrorType>);
};

export type UseAuthStateOptions<ErrorType = Error> = Omit<
  UseQueryOptions<boolean, ErrorType>,
  'queryKey' | 'queryFn'
> & {
  onSuccess?: (data: boolean) => void;
  onError?: (error: ErrorType) => void;
  onSettled?: (data?: boolean, error?: Error) => void;
};

export type UseAuthStateResult<ErrorType = Error> = QueryObserverResult<boolean, ErrorType> & {
  authenticated: boolean;
};

const noAuthProviderQueryResult = {
  authenticated: true,
  data: true,
  dataUpdatedAt: 0,
  error: null,
  errorUpdatedAt: 0,
  errorUpdateCount: 0,
  failureCount: 0,
  failureReason: null,
  fetchStatus: 'idle',
  isError: false,
  isInitialLoading: false,
  isLoading: false,
  isLoadingError: false,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isPaused: false,
  isPlaceholderData: false,
  isPending: false,
  isRefetchError: false,
  isRefetching: false,
  isStale: false,
  isSuccess: true,
  status: 'success',
  refetch: () => Promise.resolve(noAuthProviderQueryResult),
};

const noop = () => {};
