import type { ReactNode } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  HydrateOptions,
  queryOptions,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';
import type { Identifier } from 'react-shop-types';
import { useDataProvider } from '../useDataProvider';
import { getQueryClient } from 'src/client/shop/getQueryClient';

const queryClient = getQueryClient();

export const useGetOneHydrated = async ({ resource, id }: { resource: string; id: Identifier }) => {
  const dataProvider = useDataProvider();

  const options = queryOptions({
    queryKey: [resource, 'getOne', { id }],
    queryFn: () => dataProvider.getOne(resource, { id }).then(({ data }) => data),
    retry: false,
  });

  void (await queryClient.prefetchQuery(options));
};

export type HydrateOneProps = {
  id: Identifier;
  children?: ReactNode;
  resource: string;
} & HydrateOptions;

export const HydrateOne = (props: HydrateOneProps) => {
  const { id, resource, children, ...rest } = props;

  useGetOneHydrated({ resource, id });

  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: query =>
      defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
  });

  return (
    <HydrationBoundary state={dehydratedState} {...rest}>
      {children}
    </HydrationBoundary>
  );
};
