'use client';
import { useEffect, useRef } from 'react';
import { useEvent, useInfinitePaginationContext, useListContext } from 'react-shop';
import type { SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export interface InfinitePaginationProps {
  options?: IntersectionObserverInit;
  sx?: SxProps;
}

export const InfinitePagination = (props: InfinitePaginationProps) => {
  const { sx, options = defaultOptions } = props;

  const { isPending } = useListContext();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePaginationContext();

  const observerElem = useRef(null);

  const handleObserver = useEvent<[IntersectionObserverEntry[]], void>(entries => {
    const [target] = entries;
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    const element = observerElem.current;
    if (!element) return;
    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [options, fetchNextPage, hasNextPage, isPending, isFetchingNextPage, handleObserver]);

  if (isPending) {
    return null;
  }

  return (
    <Box ref={observerElem} textAlign="center" sx={sx}>
      {hasNextPage && <CircularProgress size="3em" />}
    </Box>
  );
};

const defaultOptions = { threshold: 0 };
