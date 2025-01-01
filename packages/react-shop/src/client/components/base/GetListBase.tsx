import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import type { RsRecord } from 'react-shop-types';
import type { FilterPayload, SortPayload } from '@type';
import { useListParams } from '@data/list/useListParams';
import { HydrateList } from '@data/list/HydrateList';
import { GetListProvider } from '@data/list/GetListProvider';
import { useProductInterface } from '@hooks/useProductInterface';
import type { UseGetListOptions } from '@data/list/useGetList';

export interface GetListBaseProps<RecordType extends RsRecord = any> {
  children?: ReactNode;
  sort?: SortPayload;
  perPage?: number;
  disableSyncWithLocation?: boolean;
  filterDefaultValues?: object;
  debounce?: number;
  resource?: string;
  filter?: FilterPayload;
  hydration?: boolean;
  queryOptions?: UseGetListOptions<RecordType>;
}

const DEFAULT_SORT = {
  field: 'id',
  order: 'ASC',
} as SortPayload;

export const GetListBase = <RecordType extends RsRecord = any>(
  props: GetListBaseProps<RecordType>,
) => {
  const { resource: resourceDefault } = useProductInterface();

  const {
    resource = resourceDefault,
    children,
    disableSyncWithLocation,
    perPage = 12,
    debounce = 500,
    sort = DEFAULT_SORT,
    filterDefaultValues,
    queryOptions,
    filter,
    hydration = true,
    ...rest
  } = props;

  const [listParams, queryModifiers] = useListParams({
    resource,
    sort,
    perPage,
    debounce,
    disableSyncWithLocation,
    filterDefaultValues,
  });

  const renderListProvider = () => (
    <GetListProvider
      {...rest}
      resource={resource}
      queryOptions={queryOptions}
      queryModifiers={queryModifiers}
      listParams={listParams}
      filter={filter}
    >
      {isValidElement(children) ? children : 'View component not found'}
    </GetListProvider>
  );

  return hydration ? (
    <HydrateList
      resource={resource}
      filter={filter}
      listParams={listParams}
      queryOptions={queryOptions}
    >
      {renderListProvider()}
    </HydrateList>
  ) : (
    renderListProvider()
  );
};
