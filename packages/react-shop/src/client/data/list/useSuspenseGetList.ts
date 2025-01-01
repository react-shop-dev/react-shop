import { useMemo } from 'react';
import type { RsRecord } from 'react-shop-types';
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { useDataProvider } from '../useDataProvider';
import type { GetListParams, GetListResult } from '@type/data';

export const useSuspenseGetList = <RecordType extends RsRecord = any>(
  resource: string,
  params: Partial<GetListParams> = {},
  options: UseSuspenseGetListOptions<RecordType> = {},
): UseSuspenseGetListHookValue<RecordType> => {
  const {
    pagination = { page: 1, perPage: 12 },
    sort = { field: 'id', order: 'DESC' },
    filter = {},
    meta,
  } = params;

  const dataProvider = useDataProvider();

  const result = useSuspenseQuery<GetListResult<RecordType>, Error, GetListResult<RecordType>>({
    queryKey: [resource, 'getList', { pagination, sort, filter, meta }],
    queryFn: () =>
      dataProvider
        .getList<RecordType>(resource, {
          pagination,
          sort,
          filter,
          meta,
        })
        .then(({ data, total, pageInfo }) => ({
          data,
          total,
          pageInfo,
        })),
    ...options,
  });

  return useMemo(
    () =>
      result.data
        ? {
            ...result,
            data: result.data?.data,
            total: result.data?.total,
            pageInfo: result.data?.pageInfo,
          }
        : result,
    [result],
  ) as UseSuspenseQueryResult<RecordType[], Error> & {
    total?: number;
    pageInfo?: {
      hasNextPage?: boolean;
      hasPreviousPage?: boolean;
    };
  };
};

export type UseSuspenseGetListOptions<RecordType extends RsRecord = any> = Omit<
  UseSuspenseQueryOptions<GetListResult<RecordType>, Error>,
  'queryKey' | 'queryFn'
>;

export type UseSuspenseGetListHookValue<RecordType extends RsRecord = any> = UseSuspenseQueryResult<
  RecordType[],
  Error
> & {
  total?: number;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
};
