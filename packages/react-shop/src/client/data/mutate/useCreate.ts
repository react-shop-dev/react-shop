import { useMemo, useRef } from 'react';
import type { Identifier, RsRecord } from 'react-shop-types';
import {
  useQueryClient,
  useMutation,
  UseMutationOptions,
  MutateOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { useEvent } from '@hooks/useEvent';
import { useDataProvider } from '../useDataProvider';
import type { CreateParams } from '@type/data';

export const useCreate = <
  RecordType extends Omit<RsRecord, 'id'> = any,
  MutationError = unknown,
  ResultRecordType extends RsRecord = RecordType & { id: Identifier },
>(
  resource?: string,
  params: Partial<CreateParams<Partial<RecordType>>> = {},
  options: UseCreateOptions<RecordType, MutationError, ResultRecordType> = {},
): UseCreateResult<RecordType, boolean, MutationError, ResultRecordType> => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const paramsRef = useRef<Partial<CreateParams<Partial<RecordType>>>>(params);

  const hasCallTimeOnError = useRef(false);
  const hasCallTimeOnSuccess = useRef(false);
  const hasCallTimeOnSettled = useRef(false);

  const mutation = useMutation<
    ResultRecordType,
    MutationError,
    Partial<UseCreateMutateParams<RecordType>>
  >({
    mutationFn: ({
      resource: callTimeResource = resource,
      data: callTimeData = paramsRef.current.data,
      meta: callTimeMeta = paramsRef.current.meta,
    } = {}) => {
      if (!callTimeResource) {
        throw new Error('useCreate mutation requires non-empty resource');
      }
      if (!callTimeData) {
        throw new Error('useCreate mutation requires non-empty data object');
      }
      return dataProvider
        .create<RecordType, ResultRecordType>(callTimeResource, {
          data: callTimeData,
          meta: callTimeMeta,
        })
        .then(({ data }) => data);
    },
    ...options,
    onSuccess: (
      data: ResultRecordType,
      variables: Partial<UseCreateMutateParams<RecordType>> = {},
      context: unknown,
    ) => {
      const { resource: callTimeResource = resource } = variables;

      queryClient.setQueryData([callTimeResource, 'getOne', { id: String(data.id) }], data);
      queryClient.invalidateQueries({ queryKey: [callTimeResource, 'getList'] });
      queryClient.invalidateQueries({ queryKey: [callTimeResource, 'getInfiniteList'] });
      queryClient.invalidateQueries({ queryKey: [callTimeResource, 'getMany'] });
      queryClient.invalidateQueries({ queryKey: [callTimeResource, 'getManyReference'] });

      if (options.onSuccess && !hasCallTimeOnSuccess.current) {
        options.onSuccess(data, variables, context);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (options.onSettled && !hasCallTimeOnSettled.current) {
        return options.onSettled(data, error, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (options.onError && !hasCallTimeOnError.current) {
        return options.onError(error, variables, context);
      }
    },
  });

  const create = (
    callTimeResource: string | undefined = resource,
    callTimeParams: Partial<CreateParams<Partial<RecordType>>> = {},
    callTimeOptions: MutateOptions<
      ResultRecordType,
      MutationError,
      Partial<UseCreateMutateParams<RecordType>>,
      unknown
    > & { returnPromise?: boolean } = {},
  ) => {
    const { returnPromise = options.returnPromise, ...otherCreateOptions } = callTimeOptions;

    hasCallTimeOnError.current = !!otherCreateOptions.onError;
    hasCallTimeOnSuccess.current = !!otherCreateOptions.onSuccess;
    hasCallTimeOnSettled.current = !!otherCreateOptions.onSettled;

    if (returnPromise) {
      return mutation.mutateAsync(
        { resource: callTimeResource, ...callTimeParams },
        otherCreateOptions,
      );
    }

    return mutation.mutate({ resource: callTimeResource, ...callTimeParams }, otherCreateOptions);
  };

  const mutationResult = useMemo(
    () => ({
      isLoading: mutation.isPending,
      ...mutation,
    }),
    [mutation],
  );

  return [useEvent(create), mutationResult];
};

export interface UseCreateMutateParams<RecordType extends Omit<RsRecord, 'id'> = any> {
  resource?: string;
  data?: Partial<Omit<RecordType, 'id'>>;
  meta?: any;
}

export type UseCreateOptions<
  RecordType extends Omit<RsRecord, 'id'> = any,
  MutationError = unknown,
  ResultRecordType extends RsRecord = RecordType & { id: Identifier },
> = Omit<
  UseMutationOptions<ResultRecordType, MutationError, Partial<UseCreateMutateParams<RecordType>>>,
  'mutationFn'
> & {
  returnPromise?: boolean;
};

export type CreateMutationFunction<
  RecordType extends Omit<RsRecord, 'id'> = any,
  TReturnPromise extends boolean = boolean,
  MutationError = unknown,
  ResultRecordType extends RsRecord = RecordType & { id: Identifier },
> = (
  resource?: string,
  params?: Partial<CreateParams<Partial<RecordType>>>,
  options?: MutateOptions<
    ResultRecordType,
    MutationError,
    Partial<UseCreateMutateParams<RecordType>>,
    unknown
  > & { returnPromise?: TReturnPromise },
) => TReturnPromise extends true ? Promise<ResultRecordType> : void;

export type UseCreateResult<
  RecordType extends Omit<RsRecord, 'id'> = any,
  TReturnPromise extends boolean = boolean,
  MutationError = unknown,
  ResultRecordType extends RsRecord = RecordType & { id: Identifier },
> = [
  CreateMutationFunction<RecordType, TReturnPromise, MutationError, ResultRecordType>,
  UseMutationResult<
    ResultRecordType,
    MutationError,
    Partial<UseCreateMutateParams<RecordType>>,
    unknown
  >,
];
