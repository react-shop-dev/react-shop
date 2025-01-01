import { useMemo, useRef } from 'react';
import type { Identifier, RsRecord } from 'react-shop-types';
import {
  useQueryClient,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  MutateOptions,
  QueryKey,
} from '@tanstack/react-query';
import { useDataProvider } from '../useDataProvider';
import { useEvent } from '@hooks/useEvent';
import type { MutationMode, UpdateParams } from '@type/data';

export const useUpdate = <RecordType extends RsRecord = any, ErrorType = Error>(
  resource?: string,
  params: Partial<UpdateParams<RecordType>> = {},
  options: UseUpdateOptions<RecordType, ErrorType> = {},
): UseUpdateResult<RecordType, boolean, ErrorType> => {
  const { mutationMode = 'pessimistic', ...mutationOptions } = options;
  const { id, data, meta } = params;

  const queryClient = useQueryClient();
  const dataProvider = useDataProvider();

  const mode = useRef<MutationMode>(mutationMode);
  const paramsRef = useRef<Partial<UpdateParams<RecordType>>>(params);
  const snapshot = useRef<Snapshot>([]);

  const hasCallTimeOnSuccess = useRef(false);

  const callTimeOnError = useRef<UseUpdateOptions<RecordType, ErrorType>['onError']>();
  const callTimeOnSettled = useRef<UseUpdateOptions<RecordType, ErrorType>['onSettled']>();

  const updateCache = ({ resource, id, data }: { resource: string; id: Identifier; data: any }) => {
    const updateColl = (old: RecordType[]) => {
      if (!old) {
        return old;
      }
      const index = old.findIndex(record => record.id == id);
      if (index === -1) {
        return old;
      }
      return [...old.slice(0, index), { ...old[index], ...data }, ...old.slice(index + 1)];
    };

    queryClient.setQueryData(
      [resource, 'getOne', { id: String(id), meta }],
      (record: RecordType) => ({
        ...record,
        ...data,
      }),
    );
    queryClient.setQueriesData({ queryKey: [resource, 'getList'] }, (res: any) =>
      res && res.data ? { ...res, data: updateColl(res.data) } : res,
    );
    queryClient.setQueriesData({ queryKey: [resource, 'getInfiniteList'] }, (res: any) =>
      res && res.pages
        ? {
            ...res,
            pages: res.pages.map((page: any) => ({ ...page, data: updateColl(page.data) })),
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

  const mutation = useMutation<RecordType, ErrorType, Partial<UseUpdateMutateParams<RecordType>>>({
    mutationFn: params => {
      const {
        resource: callTimeResource = resource,
        data: callTimeData = paramsRef.current.data,
        id: callTimeId = paramsRef.current.id,
        meta: callTimeMeta = paramsRef.current.meta,
        previousData: callTimePreviousData = paramsRef.current.previousData,
      } = params || {};

      if (!callTimeResource) {
        throw new Error('useUpdate mutation requires a non-empty resource');
      }
      if (callTimeId == null) {
        throw new Error('useUpdate mutation requires a non-empty id');
      }
      if (!callTimeData) {
        throw new Error('useUpdate mutation requires a non-empty data object');
      }

      return dataProvider
        .update<RecordType>(callTimeResource, {
          id: callTimeId,
          data: callTimeData,
          meta: callTimeMeta,
          previousData: callTimePreviousData,
        })
        .then(({ data }) => data);
    },
    ...mutationOptions,
    onMutate: async (variables: Partial<UseUpdateMutateParams<RecordType>>) => {
      if (mutationOptions.onMutate) {
        const userContext = (await mutationOptions.onMutate(variables)) || {};
        return {
          snapshot: snapshot.current,
          ...userContext,
        };
      } else {
        return { snapshot: snapshot.current };
      }
    },
    onError: (
      error: ErrorType,
      variables: Partial<UseUpdateMutateParams<RecordType>> = {},
      context,
    ) => {
      if (mode.current === 'optimistic') {
        const { snapshot } = context as { snapshot: Snapshot };
        // If the mutation fails, use the context returned from onMutate to rollback
        snapshot.forEach(([key, value]) => {
          queryClient.setQueryData(key, value);
        });
      }

      if (callTimeOnError.current) {
        return callTimeOnError.current(error, variables, context);
      }
      if (mutationOptions.onError) {
        return mutationOptions.onError(error, variables, context);
      }
    },
    onSuccess: (
      data: RecordType,
      variables: Partial<UseUpdateMutateParams<RecordType>> = {},
      context: unknown,
    ) => {
      if (mode.current === 'pessimistic') {
        // update the getOne and getList query cache with the new result

        const { resource: callTimeResource = resource, id: callTimeId = id } = variables;

        if (!callTimeResource) {
          throw new Error('useUpdate mutation requires a non-empty resource');
        }
        if (callTimeId == null) {
          throw new Error('useUpdate mutation requires a non-empty id');
        }

        updateCache({ resource: callTimeResource, id: callTimeId, data });

        if (mutationOptions.onSuccess && !hasCallTimeOnSuccess.current) {
          mutationOptions.onSuccess(data, variables, context);
        }
      }
    },
    onSettled: (
      data,
      error,
      variables: Partial<UseUpdateMutateParams<RecordType>> = {},
      context,
    ) => {
      if (mode.current === 'optimistic') {
        // Always refetech after error or success:
        const { snapshot } = context as { snapshot: Snapshot };
        snapshot.forEach(([queryKey]) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      if (callTimeOnSettled.current) {
        return callTimeOnSettled.current(data, error, variables, context);
      }
      if (mutationOptions.onSettled) {
        return mutationOptions.onSettled(data, error, variables, context);
      }
    },
  });

  const update = async (
    callTimeResource: string | undefined = resource,
    callTimeParams: Partial<UpdateParams<RecordType>> = {},
    callTimeOptions: MutateOptions<
      RecordType,
      ErrorType,
      Partial<UseUpdateMutateParams<RecordType>>,
      unknown
    > & {
      mutationMode?: MutationMode;
      returnPromise?: boolean;
    } = {},
  ) => {
    const {
      onSuccess,
      onSettled,
      onError,
      mutationMode,
      returnPromise = mutationOptions.returnPromise,
      ...otherCallTimeOptions
    } = callTimeOptions;

    hasCallTimeOnSuccess.current = !!onSuccess;

    callTimeOnError.current = onError;
    callTimeOnSettled.current = onSettled;

    // Store the hook time params *at the moment pf the call*
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
          {
            onSuccess,
            ...otherCallTimeOptions,
          },
        );
      }

      return mutation.mutate(
        { resource: callTimeResource, ...callTimeParams },
        {
          onSuccess,
          ...otherCallTimeOptions,
        },
      );
    }
    const {
      id: callTimeId = id,
      data: callTimeData = data,
      meta: callTimeMeta = meta,
    } = callTimeParams;

    // optimistic update
    const previousRecord = queryClient.getQueryData<RecordType>([
      callTimeResource,
      'getOne',
      { id: String(callTimeId), meta: callTimeMeta },
    ]);

    const queryKeys = [
      [callTimeResource, 'getOne', { id: String(callTimeId), meta: callTimeMeta }],
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
      throw new Error('useUpdate mutation requires a non-empty resource');
    }
    if (callTimeId == null) {
      throw new Error('useUpdate mutation requires a non-empty id');
    }

    // Optimistically update to the new value
    updateCache({
      resource: callTimeResource,
      id: callTimeId,
      data: callTimeData,
    });

    // run the success callbacks during the next tick

    setTimeout(() => {
      if (onSuccess) {
        onSuccess(
          { ...previousRecord, ...callTimeData } as RecordType,
          { resource: callTimeResource, ...callTimeParams },
          { snapshot: snapshot.current },
        );
      } else if (mutationOptions.onSuccess && !hasCallTimeOnSuccess.current) {
        mutationOptions.onSuccess(
          { ...previousRecord, ...callTimeData } as RecordType,
          { resource: callTimeResource, ...callTimeParams },
          { snapshot: snapshot.current },
        );
      }
    }, 0);

    if (mode.current === 'optimistic') {
      return mutation.mutate({ resource: callTimeResource, ...callTimeParams });
    } else {
      mutation.mutate({ resource: callTimeResource, ...callTimeParams });
    }
  };

  const mutationResult = useMemo(
    () => ({
      isLoading: mutation.isPending,
      ...mutation,
    }),
    [mutation],
  );

  return [useEvent(update), mutationResult];
};

type Snapshot = [key: QueryKey, value: any][];

export interface UseUpdateMutateParams<RecordType extends RsRecord = any> {
  resource?: string;
  id?: RecordType['id'];
  data?: Partial<RecordType>;
  previousData?: any;
  meta?: any;
}

export type UseUpdateOptions<
  RecordType extends RsRecord = any,
  ErrorType = Error,
> = UseMutationOptions<
  RecordType,
  ErrorType,
  Partial<Omit<UseUpdateMutateParams<RecordType>, 'mutationFn'>>
> & {
  mutationMode?: MutationMode;
  returnPromise?: boolean;
};

export type UpdateMutationFunction<
  RecordType extends RsRecord = any,
  TReturnPromise extends boolean = boolean,
  ErrorType = Error,
> = (
  resource?: string,
  params?: Partial<UpdateParams<RecordType>>,
  options?: MutateOptions<
    RecordType,
    ErrorType,
    Partial<UseUpdateMutateParams<RecordType>>,
    unknown
  > & { mutationMode?: MutationMode; returnPromise?: TReturnPromise },
) => Promise<TReturnPromise extends true ? RecordType : void>;

export type UseUpdateResult<
  RecordType extends RsRecord = any,
  TReturnPromise extends boolean = boolean,
  ErrorType = Error,
> = [
  UpdateMutationFunction<RecordType, TReturnPromise, ErrorType>,
  UseMutationResult<
    RecordType,
    ErrorType,
    Partial<UpdateParams<RecordType> & { resource?: string }>,
    unknown
  >,
];
