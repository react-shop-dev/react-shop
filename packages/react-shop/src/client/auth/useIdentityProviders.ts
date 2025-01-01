import { useCallback } from 'react';
import type { BuiltInProviderType } from 'react-shop-types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import isObject from 'lodash/isObject';
import { useAuthProvider } from './useAuthProvider';
import { delayedFunction } from '@data/delayedFunction';

const defaultSocial = new Set(['oidc', 'oauth']);
const defaultRedirectable = new Set(['email', 'credentials']);

export const useIdentityProviders = ({
  debounce,
  socialProviders = defaultSocial,
  redirectableProviders = defaultRedirectable,
}: UseIdentityProvidersParams = {}): UseIdentityProvidersResult => {
  const { getProviders } = useAuthProvider();

  const delayedQueryFn = delayedFunction(getProviders, debounce);

  const { data, error, isPending, refetch, isLoading, isFetching } = useQuery({
    queryKey: ['auth', 'providers'],
    queryFn: delayedQueryFn,
    refetchOnWindowFocus: false,
    select: useCallback((data: Record<BuiltInProviderType, UseIdentityProvider>) => {
      const social: UseIdentityProvider[] = [];
      const redirectable: UseIdentityProvider[] = [];
      if (!isObject(data)) {
        return null;
      }
      Object.values(data).forEach(provider => {
        const providerType = provider?.type;

        if (socialProviders.has(providerType)) {
          social.push(provider);
        }
        if (redirectableProviders.has(providerType)) {
          redirectable.push(provider);
        }
      });

      return { providers: data, social, redirectable };
    }, []),
  });

  return {
    data,
    error,
    refetch,
    isPending,
    isLoading,
    isFetching,
  };
};

export type UseIdentityProvidersParams = {
  socialProviders?: Set<string>;
  redirectableProviders?: Set<string>;
  debounce?: number;
};

export interface UseIdentityProvider {
  id: BuiltInProviderType;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export type AuthProvidersData = {
  providers?: Record<BuiltInProviderType, UseIdentityProvider>;
  social?: UseIdentityProvider[];
  redirectable?: UseIdentityProvider[];
};

interface UseIdentityProvidersResult {
  isPending: boolean;
  isLoading: boolean;
  isFetching: boolean;
  refetch?: UseQueryResult['refetch'];
  data?: AuthProvidersData | null;
  error: unknown;
}
