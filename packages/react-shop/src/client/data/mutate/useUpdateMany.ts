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
import type { MutationMode, UpdateManyParams } from '@type/data';
import { useEvent } from '@hooks/useEvent';

export const useUpdateMany = <RecordType extends RsRecord = any, MutationError = unknown>(
  resource?: string,
  params: Partial<UpdateManyParams<Partial<RecordType>>> = {},
  options: UseUpdateManyOptions<RecordType, MutationError> = {},
): UseUpdateManyResult<RecordType, boolean, MutationError> => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();

  const { ids, data, meta } = params;
  const { mutationMode = 'pessimistic', ...mutationOptions } = options;

  const mode = useRef<MutationMode>(mutationMode);
  const paramsRef = useRef<Partial<UpdateManyParams<Partial<RecordType>>>>(params);
  const snapshot = useRef<Snapshot>([]);

  const hasCallTimeOnError = useRef(false);
  const hasCallTimeOnSuccess = useRef(false);
  const hasCallTimeOnSettled = useRef(false);

  const updateCache = async ({
    resource,
    ids,
    data,
    meta,
  }: {
    resource: string;
    ids?: Identifier[];
    data: any;
    meta?: any;
  }) => {
    const updateColl = (old: RecordType[]) => {
      if (!old) {
        return old;
      }
      let newCollection = [...old];
      ids?.forEach(id => {
        const index = old.findIndex(record => record.id == id);
        if (index === -1) {
          return;
        }
        newCollection = [
          ...newCollection.slice(0, index),
          { ...newCollection[index], ...data },
          ...newCollection.slice(index + 1),
        ];
      });
      return newCollection;
    };

    ids?.forEach(id =>
      queryClient.setQueryData([resource, 'getOne', { id: String(id), meta }], (record: any) => ({
        ...record,
        ...data,
      })),
    );
    queryClient.setQueriesData({ queryKey: [resource, 'getList'] }, (res: any) =>
      res && res.data
        ? {
            ...res,
            data: updateColl(res.data),
          }
        : res,
    );
    queryClient.setQueriesData({ queryKey: [resource, 'getInfiniteList'] }, (res: any) =>
      res && res.pages
        ? {
            ...res,
            pages: res.pages.map((page: any) => ({
              ...page,
              data: updateColl(page.data),
            })),
          }
        : res,
    );
    queryClient.setQueriesData({ queryKey: [resource, 'getMany'] }, (coll: any) =>
      coll && coll.length > 0 ? updateColl(coll) : coll,
    );
    queryClient.setQueriesData({ queryKey: [resource, 'getManyReference'] }, (res: any) =>
      res && res.data ? { data: updateColl(res.data), total: res.total } : res,
    );
  };

  const mutation = useMutation<
    Array<RecordType['id']>,
    MutationError,
    Partial<UseUpdateManyMutateParams<RecordType>>
  >({
    mutationFn: params => {
      const {
        resource: callTimeResource = resource,
        ids: callTimeIds = paramsRef.current.ids,
        data: callTimeData = paramsRef.current.data,
        meta: callTimeMeta = paramsRef.current.meta,
      } = params || {};

      if (!callTimeResource) {
        throw new Error('useUpdateMany mutation requires a non-empty resource');
      }
      if (!callTimeIds) {
        throw new Error('useUpdateMany mutation requires an array of ids');
      }
      if (!callTimeData) {
        throw new Error('useUpdateMany mutation requires a non-empty data object');
      }

      return dataProvider
        .updateMany<RecordType>(callTimeResource, {
          ids: callTimeIds,
          data: callTimeData,
          meta: callTimeMeta,
        })
        .then(({ data }) => data || []);
    },
    ...mutationOptions,
    onMutate: async (variables: Partial<UseUpdateManyMutateParams<RecordType>>) => {
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
      variables: Partial<UseUpdateManyMutateParams<RecordType>> = {},
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
      dataFromResponse: Array<RecordType['id']>,
      variables: Partial<UseUpdateManyMutateParams<RecordType>> = {},
      context: unknown,
    ) => {
      if (mode.current === 'pessimistic') {
        // update the getOne and getList query cache with the new result
        const {
          resource: callTimeResource = resource,
          ids: callTimeIds = ids,
          data: callTimeData = data,
          meta: callTimeMeta = meta,
        } = variables;

        if (!callTimeResource) {
          throw new Error('useUpdateMany mutation requires a non-empty resource');
        }
        if (!callTimeIds) {
          throw new Error('useUpdateMany mutation requires an array of ids');
        }

        updateCache({
          resource: callTimeResource,
          ids: callTimeIds,
          data: callTimeData,
          meta: callTimeMeta,
        });

        if (mutationOptions.onSuccess && !hasCallTimeOnSuccess.current) {
          mutationOptions.onSuccess(dataFromResponse, variables, context);
        }
      }
    },
    onSettled: (
      data,
      error,
      variables: Partial<UseUpdateManyMutateParams<RecordType>> = {},
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

  const updateMany = async (
    callTimeResource: string | undefined = resource,
    callTimeParams: Partial<UpdateManyParams<RecordType>> = {},
    callTimeOptions: MutateOptions<
      Array<RecordType['id']>,
      MutationError,
      Partial<UseUpdateManyMutateParams<RecordType>>,
      unknown
    > & {
      mutationMode?: MutationMode;
      returnPromise?: boolean;
    } = {},
  ) => {
    if (!callTimeResource) {
      throw new Error('useUpdateMany mutation requires a non-empty resource');
    }

    const {
      mutationMode,
      returnPromise = mutationOptions.returnPromise,
      ...otherCallTimeOptions
    } = callTimeOptions;

    hasCallTimeOnError.current = !!otherCallTimeOptions.onError;
    hasCallTimeOnSuccess.current = !!otherCallTimeOptions.onSuccess;
    hasCallTimeOnSuccess.current = !!otherCallTimeOptions.onSettled;

    // store the hook time params *at the moment of the call*
    paramsRef.current = params;

    if (mutationMode) {
      mode.current = mutationMode;
    }

    if (returnPromise && mode.current !== 'pessimistic') {
      console.warn(
        'The returnPromise parameter can only be used if the mutationMode is set to pessimistic',
      );
    }

    if (mode.current === 'pessimistic') {
      if (returnPromise) {
        return mutation.mutateAsync(
          { resource: callTimeResource, ...callTimeParams },
          otherCallTimeOptions,
        );
      }
      return mutation.mutate(
        { resource: callTimeResource, ...callTimeParams },
        otherCallTimeOptions,
      );
    }

    const {
      ids: callTimeIds = ids,
      data: callTimeData = data,
      meta: callTimeMeta = meta,
    } = callTimeParams;

    if (!callTimeIds) {
      throw new Error('useUpdateMany mutation requires an array of ids');
    }

    // Optimistic update

    const queryKeys = [
      [callTimeResource, 'getOne'],
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

    // Optimistically update to the new data
    await updateCache({
      resource: callTimeResource,
      ids: callTimeIds,
      data: callTimeData,
      meta: callTimeMeta,
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

  return [useEvent(updateMany), mutationResult];
};

type Snapshot = [key: QueryKey, value: any][];

export interface UseUpdateManyMutateParams<RecordType extends RsRecord = any> {
  resource?: string;
  ids?: Array<RecordType['id']>;
  data?: Partial<RecordType>;
  previousData?: any;
  meta?: any;
}

export type UseUpdateManyOptions<
  RecordType extends RsRecord = any,
  MutationError = unknown,
> = UseMutationOptions<
  Array<RecordType['id']>,
  MutationError,
  Partial<Omit<UseUpdateManyMutateParams<RecordType>, 'mutationFn'>>
> & { mutationMode?: MutationMode; returnPromise?: boolean };

export type UseUpdateManyResult<
  RecordType extends RsRecord = any,
  TReturnPromise extends boolean = boolean,
  MutationError = unknown,
> = [
  (
    resource?: string,
    params?: Partial<UpdateManyParams<RecordType>>,
    options?: MutateOptions<
      Array<RecordType['id']>,
      MutationError,
      Partial<UseUpdateManyMutateParams<RecordType>>,
      unknown
    > & { mutationMode?: MutationMode; returnPromise?: TReturnPromise },
  ) => Promise<TReturnPromise extends true ? Array<RecordType['id']> : void>,
  UseMutationResult<
    Array<RecordType['id']>,
    MutationError,
    Partial<UpdateManyParams<Partial<RecordType>> & { resource?: string }>,
    unknown
  >,
];
