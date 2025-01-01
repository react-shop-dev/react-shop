'use client';

import { useEffect } from 'react';

export const ScrollToTop = () => {
  useEffect(() => {
    !window.location.hash && window.scrollTo(0, 0);
  }, []);

  return null;
};
