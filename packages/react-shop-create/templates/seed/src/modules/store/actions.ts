import { cache } from 'react';
import { dataProvider } from '@/lib/dataProvider';
import type { GetListParams, SortPayload } from 'react-shop';

const defaultParams = {
  pagination: { page: 1, perPage: 100 },
  sort: { field: 'id', order: 'ASC' as SortPayload['order'] },
  filter: {},
};

type FetchListResult<R> = { data?: R[]; error?: Error };

export const fetchList = cache(async function <R>(
  resource: string,
  params: GetListParams = defaultParams,
): Promise<FetchListResult<R>> {
  try {
    const result = await dataProvider.getList(resource, params);
    return { data: result?.data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
      return { error };
    }
    return { error: new Error('An unknown error occurred while fetching the data.') };
  }
});
