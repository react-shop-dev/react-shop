import { useMemo, useEffect, useRef } from 'react';
import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
  hashKey,
  QueryClient,
} from '@tanstack/react-query';
import type { Identifier, RsRecord } from 'react-shop-types';
import union from 'lodash/union';
import { useDataProvider } from '../useDataProvider';
import { batchCalls } from '../batchCalls';
import { UseGetManyHookValue } from './useGetMany';
import { useEvent } from '@hooks/useEvent';
import type { DataProvider, GetManyParams } from '@type/data';

export const useGetManyAggregate = <RecordType extends RsRecord = any>(
  resource: string,
  params: GetManyParams,
  options: UseGetManyAggregateOptions<RecordType> = {},
): UseGetManyHookValue<RecordType> => {
  const dataProvider = useDataProvider();
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();

  const { onSuccess = noop, onError = noop, onSettled = noop, ...queryOptions } = options;

  const onSuccessEvent = useEvent(onSuccess);
  const onErrorEvent = useEvent(onError);
  const onSettledEvent = useEvent(onSettled);

  const { ids, meta } = params;

  const placeholderData = useMemo(() => {
    const records = (Array.isArray(ids) ? ids : [ids]).map(id => {
      const queryHash = hashKey([resource, 'getOne', { id: String(id), meta }]);
      return queryCache.get<RecordType>(queryHash)?.state?.data;
    });

    if (records.some(record => record === undefined)) {
      return undefined;
    } else {
      return records as RecordType[];
    }
  }, [ids, queryCache, resource, meta]);

  const result = useQuery<RecordType[], Error, RecordType[]>({
    queryKey: [
      resource,
      'getMany',
      { ids: (Array.isArray(ids) ? ids : [ids]).map(id => String(id)), meta },
    ],
    queryFn: () =>
      new Promise<RecordType[]>((resolve, reject) => {
        if (!ids || ids.length === 0) {
          // no need to call the dataProvider
          return resolve([]);
        }
        // debounced / batched fetch
        return callGetManyQueries({
          resource,
          ids,
          meta,
          resolve,
          reject,
          dataProvider,
          queryClient,
        });
      }),
    placeholderData,
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
    (result.data ?? []).forEach(record => {
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

interface GetManyCallArgs {
  resource: string;
  ids: Identifier[];
  meta?: any;
  resolve: (data: any[]) => void;
  reject: (error?: any) => void;
  dataProvider: DataProvider;
  queryClient: QueryClient;
}

/**
 * Group and execute all calls to the dataProvider.getMany() method for the current tick
 */

const callGetManyQueries = batchCalls((calls: GetManyCallArgs[]) => {
  const dataProvider = calls[0].dataProvider;
  const queryClient = calls[0].queryClient;

  /**
   * Aggreagate calls by resource
   */
  const callsByResource = calls.reduce(
    (acc, callArgs) => {
      if (!acc[callArgs.resource]) {
        acc[callArgs.resource] = [];
      }
      acc[callArgs.resource].push(callArgs);
      return acc;
    },
    {} as { [resource: string]: GetManyCallArgs[] },
  );

  /**
   * For each resource, aggregate ids and call dataProvider.getMany() once
   */
  Object.keys(callsByResource).forEach(resource => {
    const callsForResource = callsByResource[resource];

    // Extract ids from queries, aggregate and deduplicate them
    const aggregatedIds = callsForResource
      .reduce((acc, { ids }) => union(acc, ids), [] as Identifier[]) // concat + unique
      .filter((value: Identifier) => value != null && value !== ''); // remove null values

    const uniqueMeta = callsForResource.reduce((acc, { meta }) => meta || acc, undefined);

    if (aggregatedIds.length === 0) {
      // no need to call the data provider if all the ids are null
      callsForResource.forEach(({ resolve }) => {
        resolve([]);
      });
      return;
    }

    const callThatHasAllAggregatedIds = callsForResource.find(
      ({ ids }: { ids: Identifier[] }) => JSON.stringify(ids) === JSON.stringify(aggregatedIds),
    );

    if (callThatHasAllAggregatedIds) {
      // There is only one call ( no aggregation ), or one of the calls has the same ids as the sum of all calls
      const { dataProvider, resource, ids, meta } = callThatHasAllAggregatedIds;

      dataProvider
        .getMany<any>(resource, { ids, meta })
        .then(({ data }) => data)
        .then(
          data => {
            // We must then resolve all the pending calls with the data they requested
            callsForResource.forEach(({ ids, resolve }) => {
              resolve(
                data.filter((record: RsRecord) =>
                  ids.map((id: Identifier) => String(id)).includes(String(record.id)),
                ),
              );
            });
          },
          (error: Error) => {
            // All pending calls must also receive the error
            callsForResource.forEach(({ reject }) => reject(error));
          },
        );
    }

    /**
     * Call dataProvider.getMany() with the aggregatedIds,
     * and resolve each of the promises using the results
     */
    queryClient
      .fetchQuery<any[], Error, any[]>({
        queryKey: [
          resource,
          'getMany',
          { ids: aggregatedIds.map((id: Identifier) => String(id)), meta: uniqueMeta },
        ],
        queryFn: () =>
          dataProvider
            .getMany<any>(resource, { ids: aggregatedIds, meta: uniqueMeta })
            .then(({ data }) => data),
      })
      .then(data => {
        callsForResource.forEach(({ ids, resolve }) => {
          resolve(
            data.filter((record: RsRecord) =>
              ids.map((id: Identifier) => String(id)).includes(String(record.id)),
            ),
          );
        });
      })
      .catch(error => callsForResource.forEach(({ reject }) => reject(error)));
  });
});

const noop = () => undefined;

export type UseGetManyAggregateOptions<RecordType extends RsRecord = any> = Omit<
  UseQueryOptions<RecordType[]>,
  'queryKey' | 'queryFn'
> & {
  onSuccess?: (data: RecordType[]) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: RecordType[], error?: Error | null) => void;
};
