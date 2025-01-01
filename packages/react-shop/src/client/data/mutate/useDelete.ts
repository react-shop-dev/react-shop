import { useMemo, useRef } from 'react';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  MutateOptions,
  useQueryClient,
  QueryKey,
} from '@tanstack/react-query';
import type { Identifier, RsRecord } from 'react-shop-types';
import { useDataProvider } from '../useDataProvider';
import { useEvent } from '@hooks/useEvent';
import type { DeleteParams, MutationMode } from '@type/data';

export const useDelete = <RecordType extends RsRecord = any, MutationError = unknown>(
  resource?: string,
  params: Partial<DeleteParams<RecordType>> = {},
  options: UseDeleteOptions<RecordType, MutationError> = {},
): UseDeleteResult<RecordType, MutationError> => {
  const { mutationMode = 'pessimistic', ...mutationOptions } = options;
  const { id, previousData } = params;

  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();

  const mode = useRef<MutationMode>(mutationMode);
  const paramsRef = useRef<Partial<DeleteParams<RecordType>>>(params);
  const snapshot = useRef<Snapshot>([]);

  const hasCallTimeOnError = useRef(false);
  const hasCallTimeOnSuccess = useRef(false);
  const hasCallTimeOnSettled = useRef(false);

  const updateCache = ({ resource, id }: { resource: string; id: Identifier }) => {
    const updateColl = (old: RecordType[]) => {
      if (!old) {
        return old;
      }
      const index = old.findIndex(record => record.id == id);
      if (index === -1) {
        return old;
      }
      return [...old.slice(0, index), ...old.slice(index + 1)];
    };

    queryClient.setQueriesData({ queryKey: [resource, 'getList'] }, (res: any) => {
      if (!res || !res.data) {
        return res;
      }
      const newCollection = updateColl(res.data);
      const recordWasFound = newCollection.length < res.data.length;
      return recordWasFound
        ? {
            data: newCollection,
            total: res.total ? res.total - 1 : undefined,
            pageInfo: res.pageInfo,
          }
        : res;
    });

    queryClient.setQueriesData({ queryKey: [resource, 'getInfiniteList'] }, (res: any) => {
      if (!res || !res.pages) {
        return res;
      }
      return {
        ...res,
        pages: res.pages.map((page: any) => {
          const newCollection = updateColl(page.data);
          const recordWasFound = Number(newCollection?.length) < page.data.length;
          return recordWasFound
            ? {
                ...page,
                data: newCollection,
                total: page.total ? page.total - 1 : undefined,
                pageInfo: page.pageInfo,
              }
            : page;
        }),
      };
    });

    queryClient.setQueriesData({ queryKey: [resource, 'getMany'] }, (coll: any) =>
      coll && coll.length > 0 ? updateColl(coll) : coll,
    );
    queryClient.setQueriesData({ queryKey: [resource, 'getManyReference'] }, (res: any) => {
      if (!res || !res.data) {
        return res;
      }
      const newCollection = updateColl(res.data);
      const recordWasFound = Number(newCollection?.length) < res.data.length;

      return recordWasFound ? { data: newCollection, total: res.total - 1 } : res;
    });
  };

  const mutation = useMutation<
    RecordType,
    MutationError,
    Partial<UseDeleteMutateParams<RecordType>>
  >({
    mutationFn: params => {
      const {
        resource: callTimeResource = resource,
        id: callTimeId = paramsRef.current.id,
        previousData: callTimePreviousData = paramsRef.current.previousData,
        meta: callTimeMeta = paramsRef.current.meta,
      } = params || {};

      if (!callTimeResource) {
        throw new Error('useDelete mutation requires a non-empty resource');
      }
      if (callTimeId == null) {
        throw new Error('useDelete mutation requires a non-empty id');
      }

      return dataProvider
        .delete<RecordType>(callTimeResource, {
          id: callTimeId,
          previousData: callTimePreviousData,
          meta: callTimeMeta,
        })
        .then(({ data }) => data);
    },
    ...mutationOptions,
    onMutate: async (variables: Partial<UseDeleteMutateParams<RecordType>>) => {
      if (mutationOptions.onMutate) {
        const userContext = (await mutationOptions.onMutate(variables)) || {};
        return { snapshot: snapshot.current, ...userContext };
      } else {
        return { snapshot: snapshot.current };
      }
    },
    onSuccess: (
      data: RecordType,
      variables: Partial<UseDeleteMutateParams<RecordType>> = {},
      context: unknown,
    ) => {
      if (mode.current === 'pessimistic') {
        const { resource: callTimeResource = resource, id: callTimeId = id } = variables;

        if (!callTimeResource) {
          throw new Error('useDelete mutation requires a non-empty resource');
        }
        if (callTimeId == null) {
          throw new Error('useDelete mutation requires a non-empty id');
        }

        updateCache({
          resource: callTimeResource,
          id: callTimeId,
        });

        if (mutationOptions.onSuccess && !hasCallTimeOnSuccess.current) {
          mutationOptions.onSuccess(data, variables, context);
        }
      }
    },
    onError: (
      error: MutationError,
      variables: Partial<UseDeleteMutateParams<RecordType>> = {},
      context,
    ) => {
      if (mode.current === 'optimistic') {
        // If the mutation fails, use the context returned from onMutate to rollback
        const { snapshot } = context as { snapshot: Snapshot };

        snapshot.forEach(([key, value]) => {
          queryClient.setQueryData(key, value);
        });
      }
      if (mutationOptions.onError && !hasCallTimeOnError.current) {
        return mutationOptions.onError(error, variables, context);
      }
    },
    onSettled: (
      data,
      error,
      variables: Partial<UseDeleteMutateParams<RecordType>> = {},
      context,
    ) => {
      if (mode.current === 'optimistic') {
        // Always refetech after error or success
        const { snapshot } = context as { snapshot: Snapshot };
        snapshot.forEach(([queryKey]) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      if (mutationOptions.onSettled && !hasCallTimeOnSettled.current) {
        return mutationOptions.onSettled(data, error, variables, context);
      }
    },
  });

  const mutate = async (
    callTimeResource: string | undefined = resource,
    callTimeParams: Partial<DeleteParams<RecordType>> = {},
    callTimeOptions: MutateOptions<
      RecordType,
      MutationError,
      Partial<UseDeleteMutateParams<RecordType>>,
      unknown
    > & {
      mutationMode?: MutationMode;
      onSuccess?: (
        data: any,
        variables: Partial<UseDeleteMutateParams<RecordType>>,
        context: unknown,
      ) => void;
    } = {},
  ) => {
    const { mutationMode, ...otherCallTimeOptions } = callTimeOptions;
    hasCallTimeOnError.current = !!callTimeOptions.onError;
    hasCallTimeOnSuccess.current = !!callTimeOptions.onSuccess;
    hasCallTimeOnSettled.current = !!callTimeOptions.onSettled;

    // Store the hook time params *at the moment pf the call*
    paramsRef.current = params;

    if (mutationMode) {
      mode.current = mutationMode;
    }

    if (mode.current === 'pessimistic') {
      return mutation.mutate(
        { resource: callTimeResource, ...callTimeParams },
        otherCallTimeOptions,
      );
    }
    const { id: callTimeId = id, previousData: callTimePreviousData = previousData } =
      callTimeParams;

    // optimistic update
    const queryKeys = [
      [callTimeResource, 'getList'],
      [callTimeResource, 'getInfiniteList'],
      [callTimeResource, 'getMany'],
      [callTimeResource, 'getManyReference'],
    ];

    snapshot.current = queryKeys.reduce(
      (prev, queryKey) => prev.concat(queryClient.getQueriesData({ queryKey })),
      [] as Snapshot,
    );

    // Cancel any outgoing re-fetches (so they don't overwrite our optimistic mode)
    await Promise.all(
      snapshot.current.map(([queryKey]) => queryClient.cancelQueries({ queryKey })),
    );

    if (!callTimeResource) {
      throw new Error('useDelete mutation requires a non-empty resource');
    }
    if (callTimeId == null) {
      throw new Error('useDelete mutation requires a non-empty id');
    }

    // Optimistically update to the new value
    updateCache({
      resource: callTimeResource,
      id: callTimeId,
    });

    // run the success callbacks during the next tick
    setTimeout(() => {
      if (callTimeOptions.onSuccess) {
        callTimeOptions.onSuccess(
          callTimePreviousData,
          { resource: callTimeResource, ...callTimeParams },
          { snapshot: snapshot.current },
        );
      } else if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(
          callTimePreviousData,
          { resource: callTimeResource, ...callTimeParams },
          { snapshot: snapshot.current },
        );
      }
    }, 0);

    // call the mutate method without success side effects
    if (mode.current === 'optimistic') {
      return mutation.mutate(
        { resource: callTimeResource, ...callTimeParams },
        { onSettled: callTimeOptions.onSettled, onError: callTimeOptions.onError },
      );
    } else {
      mutation.mutate(
        { resource: callTimeResource, ...callTimeParams },
        {
          onSettled: callTimeOptions.onSettled,
          onError: callTimeOptions.onError,
        },
      );
    }
  };

  const mutationResult = useMemo(
    () => ({
      isLoading: mutation.isPending,
      ...mutation,
    }),
    [mutation],
  );

  return [useEvent(mutate), mutationResult];
};

type Snapshot = [key: QueryKey, value: any][];

export interface UseDeleteMutateParams<RecordType extends RsRecord = any> {
  resource?: string;
  id?: RecordType['id'];
  data?: Partial<RecordType>;
  previousData?: any;
  meta?: any;
}

export type UseDeleteOptions<
  RecordType extends RsRecord = any,
  MutationError = unknown,
> = UseMutationOptions<RecordType, MutationError, Partial<UseDeleteMutateParams<RecordType>>> & {
  mutationMode?: MutationMode;
  onSuccess?: (
    data: RecordType | undefined,
    variables: Partial<UseDeleteMutateParams<RecordType>>,
    context: unknown,
  ) => void;
};

export type UseDeleteResult<RecordType extends RsRecord = any, MutationError = unknown> = [
  (
    resource?: string,
    params?: Partial<DeleteParams<RecordType>>,
    options?: MutateOptions<
      RecordType,
      MutationError,
      Partial<UseDeleteMutateParams<RecordType>>,
      unknown
    > & { mutationMode?: MutationMode },
  ) => Promise<void>,
  UseMutationResult<
    RecordType,
    MutationError,
    Partial<DeleteParams<RecordType> & { resource?: string }>,
    unknown
  >,
];
