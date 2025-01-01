import type { ReactNode } from 'react';
import {
  defaultShouldDehydrateQuery,
  dehydrate,
  HydrationBoundary,
  queryOptions,
} from '@tanstack/react-query';
import type { FilterPayload, SortPayload } from '@type';
import { useDataProvider } from '../useDataProvider';
import { ListParams } from './useListParams';
import { UseGetListOptions } from './useGetList';
import { getQueryClient } from 'src/client/shop/getQueryClient';

const queryClient = getQueryClient();

export const useGetListHydrated = async ({
  resource,
  listParams,
  meta,
  filter: filterProp,
}: {
  resource: string;
  listParams: ListParams;
  filter?: FilterPayload;
  meta?: object;
}) => {
  const pagination = { page: listParams.page, perPage: listParams.perPage };
  const sort = { field: listParams.sort, order: listParams.order } as SortPayload;
  const filter = { ...listParams.filter, ...filterProp };

  const dataProvider = useDataProvider();

  const options = queryOptions({
    queryKey: [resource, 'getList', { pagination, sort, filter }],
    queryFn: () =>
      dataProvider
        .getList(resource, {
          pagination,
          sort,
          filter,
          meta,
        })
        .then(({ data, total, pageInfo }) => ({ data, total, pageInfo })),
    retry: false,
  });

  void (await queryClient.prefetchQuery(options));
};

export interface HydrateListProps {
  resource: string;
  listParams: ListParams;
  filter?: FilterPayload;
  children: ReactNode;
  queryOptions?: UseGetListOptions;
}

export const HydrateList = (props: HydrateListProps) => {
  const { resource, listParams, children, filter, queryOptions } = props;

  useGetListHydrated({ resource, filter, listParams });

  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: query =>
      defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
  });

  return (
    <HydrationBoundary state={dehydratedState} options={queryOptions}>
      {children}
    </HydrationBoundary>
  );
};
