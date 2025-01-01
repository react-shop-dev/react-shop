'use client';

import { useCartProvider, useIsLoaded } from 'react-shop';
import { LineItemPlaceholder } from '@/modules/common/LineItemPlaceholder';
import LineItems from '@/modules/common/LineItems';

const SummaryList = () => {
  const { data: cartItems = [], isFetching, error } = useCartProvider();

  const loaded = useIsLoaded(isFetching);

  if (!loaded) {
    return <LineItemPlaceholder />;
  }

  if (error) {
    return <>Something went wrong...</>;
  }

  return <LineItems data={cartItems} />;
};

export default SummaryList;
