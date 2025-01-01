import { useEffect } from 'react';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { RsRecord } from 'react-shop-types';
import { useDataProvider } from '../useDataProvider';
import { useEvent } from '@hooks/useEvent';
import type { GetOneParams, GetOneResult } from '@type/data';

export const useGetOne = <RecordType extends RsRecord = any>(
  resource: string,
  { id, meta }: GetOneParams<RecordType>,
  options: UseGetOneOptions<RecordType> = {},
): UseGetOneHookValue<RecordType> => {
  const dataProvider = useDataProvider();

  const { onError = noop, onSuccess = noop, onSettled = noop, ...queryOptions } = options;

  const onSuccessEvent = useEvent(onSuccess);
  const onErrorEvent = useEvent(onError);
  const onSettledEvent = useEvent(onSettled);

  const result = useQuery<RecordType>({
    queryKey: [resource, 'getOne', { id: String(id), meta }],
    queryFn: () => dataProvider.getOne<RecordType>(resource, { id, meta }).then(({ data }) => data),
    ...queryOptions,
  });

  useEffect(() => {
    if (result.data === undefined || result.error != null || result.isFetching) {
      return;
    }
    onSuccessEvent(result.data);
  }, [onSuccessEvent, result.data, result.error, result.isFetching]);

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

  return result;
};

const noop = () => undefined;

export type UseGetOneOptions<RecordType extends RsRecord = any> = Omit<
  UseQueryOptions<GetOneResult<RecordType>['data']>,
  'queryKey' | 'queryFn'
> & {
  onSuccess?: (data: GetOneResult<RecordType>['data']) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: GetOneResult<RecordType>['data'], error?: Error | null) => void;
};

export type UseGetOneHookValue<RecordType extends RsRecord = any> = UseQueryResult<
  GetOneResult<RecordType>['data']
>;
