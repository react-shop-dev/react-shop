import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type { RsRecord } from 'react-shop-types';
import { useDataProvider } from '../useDataProvider';
import type { GetOneParams, GetOneResult } from '@type/data';

export const useSuspenseGetOne = <RecordType extends RsRecord = any>(
  resource: string,
  { id, meta }: GetOneParams<RecordType>,
  options: UseSuspenseGetOneOptions<RecordType> = {},
): UseSuspenseGetOneHookValue<RecordType> => {
  const dataProvider = useDataProvider();

  const result = useSuspenseQuery<RecordType>({
    queryKey: [resource, 'getOne', { id: String(id), meta }],
    queryFn: () =>
      id == null
        ? new Promise(() => {})
        : dataProvider.getOne<RecordType>(resource, { id, meta }).then(({ data }) => data),
    ...options,
  });

  return result;
};

export type UseSuspenseGetOneOptions<RecordType extends RsRecord = any> = Omit<
  UseSuspenseQueryOptions<GetOneResult<RecordType>['data']>,
  'queryKey' | 'queryFn'
>;

export type UseSuspenseGetOneHookValue<RecordType extends RsRecord = any> = UseSuspenseQueryResult<
  GetOneResult<RecordType>['data']
>;
