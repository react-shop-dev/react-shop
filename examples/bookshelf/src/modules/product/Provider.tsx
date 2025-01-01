import type { ReactNode } from 'react';
import { RecordContextProvider } from 'react-shop';
import { redirect } from 'next/navigation';
import { fetchOneRecord } from '@/lib/data/fetch';
import NotifyError from '../common/NotifyError';
import { StoreItem } from '@/types';

export const Provider = async ({ slug, children }: { slug: string; children: ReactNode }) => {
  const id = slug.split('_id-').at(-1);

  if (!id) {
    redirect('/');
  }

  const result = await fetchOneRecord<StoreItem>('products', { id });

  if (result.error) {
    return <NotifyError message={result.error.message} />;
  }
  return <RecordContextProvider value={result.data}>{children}</RecordContextProvider>;
};
