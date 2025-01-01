import { isValidElement } from 'react';
import type { RsRecord } from 'react-shop-types';
import { useListParams } from '@data/list/useListParams';
import { InfiniteListProvider } from '@data/list/InfiniteListProvider';
import { useProductInterface } from '@hooks/useProductInterface';
import { GetListBaseProps } from './GetListBase';
import type { UseInfiniteGetListOptions } from '@data/list/useInfinityGetList';

export interface GetInfiniteListBaseProps<RecordType extends RsRecord = any>
  extends Omit<GetListBaseProps, 'queryOptions'> {
  queryOptions?: UseInfiniteGetListOptions<RecordType>;
}

export const InfiniteList = <RecordType extends RsRecord = any>(
  props: GetInfiniteListBaseProps<RecordType>,
) => {
  const { resource: resourceDefault } = useProductInterface();

  const {
    resource = resourceDefault,
    perPage = 12,
    debounce = 500,
    sort,
    filter,
    filterDefaultValues,
    disableSyncWithLocation = true,
    queryOptions,
    children,
    ...rest
  } = props;

  const [listParams, queryModifiers] = useListParams({
    resource,
    sort,
    perPage,
    filterDefaultValues,
    disableSyncWithLocation,
    debounce,
  });

  return (
    <InfiniteListProvider
      {...rest}
      resource={resource}
      queryOptions={queryOptions}
      queryModifiers={queryModifiers}
      listParams={listParams}
      filter={filter}
    >
      {isValidElement(children) ? children : 'View component not found'}
    </InfiniteListProvider>
  );
};
