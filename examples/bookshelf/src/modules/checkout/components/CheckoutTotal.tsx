'use client';

import { useCartProvider, useIsLoaded } from 'react-shop';
import Summary from '@/modules/common/Summary';
import { SummaryPlaceholder } from '../../common/SummaryPlaceholder';

export const CheckoutTotal = () => {
  const { cart: { total, shipping_total, subtotal, tax_total } = {}, isFetching } =
    useCartProvider();

  const loaded = useIsLoaded(isFetching);

  if (!loaded) {
    return <SummaryPlaceholder />;
  }

  return <Summary {...{ total, shipping_total, subtotal, tax_total }} />;
};
