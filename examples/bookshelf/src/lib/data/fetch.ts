'use server';

import { cache } from 'react';
import type { GetListParams, SortPayload } from 'react-shop';
import type { Identifier } from 'react-shop-types';
import dataProvider from '@/lib/data/fakeDataProvider';
import { IpLocation } from '@/types/api';

type FetchListResult<R> = { data?: R[]; error?: Error };
type FetchOneResult<R> = { data?: R; error?: Error };

const defaultParams = {
  pagination: { page: 1, perPage: 100 },
  sort: { field: 'id', order: 'ASC' as SortPayload['order'] },
  filter: {},
};

export const fetchList = cache(async function <R>(
  resource: string,
  params: GetListParams = defaultParams,
): Promise<FetchListResult<R>> {
  try {
    const result = await dataProvider.getList(resource, params, { next: { tags: [resource] } });
    return { data: result?.data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
      return { error };
    }
    return { error: new Error('An unknown error occurred while fetching the data.') };
  }
});

export const fetchOneRecord = cache(
  async <R>(resource: string, { id }: { id: Identifier }): Promise<FetchOneResult<R>> => {
    try {
      const result = await dataProvider.getOne(resource, { id });
      return { data: result.data };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching record:', error.message);
        return { error };
      }
      return { error: new Error('An unknown error occurred while fetching the record.') };
    }
  },
);

export const fetchLocation = cache(async (): Promise<IpLocation | undefined> => {
  try {
    const result = await fetch('https://ipapi.co/json', {
      next: { tags: ['location'] },
    });
    return result.json();
  } catch (error: unknown) {
    console.error('error', error);
  }
});
