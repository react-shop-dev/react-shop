import { useMemo, useRef } from 'react';
import type { Identifier, RsRecord } from 'react-shop-types';
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  MutateOptions,
  UseMutationResult,
  QueryKey,
} from '@tanstack/react-query';
import { useDataProvider } from '../useDataProvider';
import type { DeleteManyParams, MutationMode } from '@type/data';
import { useEvent } from '@hooks/useEvent';

export const useDeleteMany = <RecordType extends RsRecord = any, MutationError = unknown>(
  resource?: string,
  params: Partial<DeleteManyParams<RecordType>> = {},
  options: UseDeleteManyOptions<RecordType, MutationError> = {},
): UseDeleteManyResult<RecordType, MutationError> => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const { ids } = params;
  const { mutationMode = 'pessimistic', ...mutationOptions } = options;

  const mode = useRef<MutationMode>(mutationMode);
  const paramsRef = useRef<Partial<DeleteManyParams<RecordType>>>({});
  const snapshot = useRef<Snapshot>([]);

  const hasCallTimeOnError = useRef(false);
  const hasCallTimeOnSuccess = useRef(false);
  const hasCallTimeOnSettled = useRef(false);

  const updateCache = ({ resource, ids }: { resource: string; ids: Identifier[] }) => {
    const updateColl = (old: RecordType[]) => {
      if (!old) {
        return old;
      }
      let newCollection = [...old];
      ids.forEach(id => {
        const index = newCollection.findIndex(record => record.id == id);
        if (index === -1) {
          return;
        }
        newCollection = [...newCollection.slice(0, index), ...newCollection.slice(index + 1)];
      });
      return newCollection;
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
            total: res.total ? res.total - (res.data.length - newCollection.length) : undefined,
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
          const recordWasFound = newCollection?.length < page.data.length;
          return recordWasFound
            ? {
                ...page,
                data: newCollection,
                total: page.total
                  ? page.total - (page.data.length - Number(newCollection?.length))
                  : undefined,
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
      const recordWasFound = newCollection.length < res.data.length;
      if (!recordWasFound) {
        return res;
      }
      if (res.total) {
        return {
          data: newCollection,
          total: res.total - (res.data.length - newCollection.length),
        };
      }
      if (res.pageInfo) {
        return {
          data: newCollection,
          pageInfo: res.pageInfo,
        };
      }
      throw new Error('Found getList result in cache without total or pageInfo');
    });
  };

  const mutation = useMutation<
    RecordType['id'][],
    MutationError,
    Partial<UseDeleteManyMutateParams<RecordType>>
  >({
    mutationFn: params => {
      const {
        resource: callTimeResource = resource,
        ids: callTimeIds = paramsRef.current.ids,
        meta: callTimeMeta = paramsRef.current.meta,
      } = params || {};

      if (!callTimeResource) {
        throw new Error('useDeleteMany mutation requires a non-empty resource');
      }
      if (!callTimeIds) {
        throw new Error('useDeleteMany mutation requires an array of ids');
      }
      if (callTimeIds.length === 0) {
        return Promise.resolve([]);
      }

      return dataProvider
        .deleteMany<RecordType>(callTimeResource, {
          ids: callTimeIds,
          meta: callTimeMeta,
        })
        .then(({ data }) => data || []);
    },
    ...mutationOptions,
    onMutate: async (variables: Partial<UseDeleteManyMutateParams<RecordType>>) => {
      if (mutationOptions.onMutate) {
        const userContext = (await mutationOptions.onMutate(variables)) || {};
        return { snapshot: snapshot.current, ...userContext };
      } else {
        // Return a context object with the snapshot value
        return { snapshot: snapshot.current };
      }
    },
    onError: (
      error: MutationError,
      variables: Partial<UseDeleteManyMutateParams<RecordType>> = {},
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
    onSuccess: (
      data: RecordType['id'][],
      variables: Partial<UseDeleteManyMutateParams<RecordType>> = {},
      context: unknown,
    ) => {
      if (mode.current === 'pessimistic') {
        const { resource: callTimeResource = resource, ids: callTimeIds = ids } = variables;

        if (!callTimeResource) {
          throw new Error('useDeleteMany mutation requires a non-empty resource');
        }
        if (!callTimeIds) {
          throw new Error('useDeleteMany mutation requires an array of ids');
        }

        updateCache({
          resource: callTimeResource,
          ids: callTimeIds,
        });

        if (mutationOptions.onSuccess && !hasCallTimeOnSuccess.current) {
          mutationOptions.onSuccess(data, variables, context);
        }
      }
    },
    onSettled: (
      data,
      error,
      variables: Partial<UseDeleteManyMutateParams<RecordType>> = {},
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
    callTimeParams: Partial<DeleteManyParams<RecordType>> = {},
    callTimeOptions: MutateOptions<
      RecordType['id'][],
      MutationError,
      Partial<UseDeleteManyMutateParams<RecordType>>,
      unknown
    > & {
      mutationMode?: MutationMode;
    } = {},
  ) => {
    const { mutationMode, ...otherCallTimeOptions } = callTimeOptions;
    hasCallTimeOnError.current = !!callTimeOptions.onError;
    hasCallTimeOnSuccess.current = !!callTimeOptions.onSuccess;
    hasCallTimeOnSuccess.current = !!callTimeOptions.onSettled;

    // store the hook time params *at the moment of the call*
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

    const { ids: callTimeIds = ids } = callTimeParams;

    if (!callTimeIds) {
      throw new Error('useDeleteMany mutation requires an array of ids');
    }

    if (!callTimeResource) {
      throw new Error('useDeleteMany mutation requires a non-empty resource');
    }

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

    // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
    await Promise.all(
      snapshot.current.map(([queryKey]) => queryClient.cancelQueries({ queryKey })),
    );

    // Optimistically update to the new value
    updateCache({
      resource: callTimeResource,
      ids: callTimeIds,
    });

    // run the success callbacks during the next tick
    setTimeout(() => {
      if (otherCallTimeOptions.onSuccess) {
        otherCallTimeOptions.onSuccess(
          callTimeIds,
          { resource: callTimeResource, ...callTimeParams },
          { snapshot: snapshot.current },
        );
      } else if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(
          callTimeIds,
          { resource: callTimeResource, ...callTimeParams },
          { snapshot: snapshot.current },
        );
      }
    }, 0);

    // call the mutate method without success side effects
    if (mode.current === 'optimistic') {
      return mutation.mutate(
        { resource: callTimeResource, ...callTimeParams },
        { onSettled: otherCallTimeOptions.onSettled, onError: otherCallTimeOptions.onError },
      );
    } else {
      mutation.mutate(
        { resource: callTimeResource, ...callTimeParams },
        { onSettled: otherCallTimeOptions.onSettled, onError: otherCallTimeOptions.onError },
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

export interface UseDeleteManyMutateParams<RecordType extends RsRecord = any> {
  resource?: string;
  ids?: RecordType['id'][];
  meta?: any;
}

export type UseDeleteManyOptions<
  RecordType extends RsRecord = any,
  MutationError = unknown,
> = UseMutationOptions<
  RecordType['id'][],
  MutationError,
  Partial<UseDeleteManyMutateParams<RecordType>>
> & { mutationMode?: MutationMode };

export type UseDeleteManyResult<RecordType extends RsRecord = any, MutationError = unknown> = [
  (
    resource?: string,
    params?: Partial<DeleteManyParams<RecordType>>,
    options?: MutateOptions<
      RecordType['id'][],
      MutationError,
      Partial<UseDeleteManyMutateParams<RecordType>>,
      unknown
    > & { mutationMode?: MutationMode },
  ) => Promise<void>,
  UseMutationResult<
    RecordType['id'][],
    MutationError,
    Partial<DeleteManyParams<RecordType> & { resource?: string }>,
    unknown
  >,
];
