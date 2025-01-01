import { useEffect, useRef } from 'react';
import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
  hashKey,
} from '@tanstack/react-query';
import type { RsRecord } from 'react-shop-types';
import { useEvent } from '@hooks/useEvent';
import { useDataProvider } from '../useDataProvider';
import type { GetManyParams } from '@type/data';

export const useGetMany = <RecordType extends RsRecord = any>(
  resource: string,
  params: Partial<GetManyParams> = {},
  options: UseGetManyOptions<RecordType> = {},
): UseGetManyHookValue<RecordType> => {
  const { ids, meta } = params;
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();

  const { onSuccess = noop, onError = noop, onSettled = noop, ...queryOptions } = options;

  const onSuccessEvent = useEvent(onSuccess);
  const onErrorEvent = useEvent(onError);
  const onSettledEvent = useEvent(onSettled);

  const result = useQuery<RecordType[], Error, RecordType[]>({
    queryKey: [
      resource,
      'getMany',
      { ids: !ids || ids.length === 0 ? [] : ids.map(id => String(id)), meta },
    ],
    queryFn: () => {
      if (!ids || ids.length === 0) {
        // no need to call the dataProvider
        return Promise.resolve([]);
      }
      return dataProvider.getMany<RecordType>(resource, { ids, meta }).then(({ data }) => data);
    },
    placeholderData: () => {
      const records =
        !ids || ids.length === 0
          ? []
          : ids.map(id => {
              const queryHash = hashKey([resource, 'getOne', { id: String(id), meta }]);
              return queryCache.get<RecordType>(queryHash)?.state?.data;
            });

      if (records.some(record => record === undefined)) {
        return undefined;
      } else {
        return records as RecordType[];
      }
    },
    retry: false,
    ...queryOptions,
  });

  const metaValue = useRef(meta);
  const resourceValue = useRef(resource);

  useEffect(() => {
    metaValue.current = meta;
  }, [meta]);

  useEffect(() => {
    resourceValue.current = resource;
  }, [resource]);

  useEffect(() => {
    if (result.data === undefined || result.error != null || result.isFetching) {
      return;
    }
    // optimistically populate the get one cache
    result.data.forEach(record => {
      queryClient.setQueryData(
        [resourceValue.current, 'getOne', { id: String(record.id), meta: metaValue.current }],
        oldRecord => oldRecord ?? record,
      );
    });
    onSuccessEvent(result.data);
  }, [queryClient, onSuccessEvent, result.data, result.error, result.isFetching]);

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

export type UseGetManyOptions<RecordType extends RsRecord = any> = Omit<
  UseQueryOptions<RecordType[], Error>,
  'queryKey' | 'queryFn'
> & {
  onSuccess?: (data: RecordType[]) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: RecordType[], error?: Error | null) => void;
};

export type UseGetManyHookValue<RecordType extends RsRecord = any> = UseQueryResult<
  RecordType[],
  Error
>;
