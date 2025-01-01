import { useAuthState, UseAuthStateOptions } from './useAuthState';

export const useAuthenticated = (
  required = true,
  queryOptions: UseAuthenticatedOptions = emptyParams,
) => {
  useAuthState({ required }, queryOptions);
};

const emptyParams = {};

export type UseAuthenticatedOptions = UseAuthStateOptions;
