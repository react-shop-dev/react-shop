'use client';

import { useEffect } from 'react';
import { manageViewedProduct } from 'react-shop/server';

export const WatchProduct = ({ id }: { id: string }) => {
  const handleProductView = async () => {
    await manageViewedProduct(id);
  };

  useEffect(() => {
    handleProductView();
  }, []);

  return null;
};
