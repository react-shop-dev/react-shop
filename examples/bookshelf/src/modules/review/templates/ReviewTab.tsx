'use client';

import { Fragment } from 'react';
import { useGetIdentity, useRecordContext, useSuspenseGetList } from 'react-shop';
import { AddReview } from '@/modules/review/templates/AddReview';
import { ReviewsList } from '@/modules/review/templates/ReviewsList';
import { ReviewCount } from '../components/ReviewCount';
import type { Review, StoreItem } from '@/types';

export const ReviewTab = () => {
  const product = useRecordContext<StoreItem>();
  const { identity } = useGetIdentity();

  const { data: reviews, total } = useSuspenseGetList<Review>(
    'reviews',
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: 'created_at', order: 'DESC' },
      filter: { status: 'accepted', product_id: product?.id },
    },
    { refetchOnWindowFocus: false },
  );

  return (
    <Fragment>
      <ReviewCount element={total ? <>({total})</> : null} />
      <ReviewsList userId={identity?.id} data={reviews} />
      {identity && product?.id ? <AddReview id={product.id} user={identity} /> : null}
    </Fragment>
  );
};
