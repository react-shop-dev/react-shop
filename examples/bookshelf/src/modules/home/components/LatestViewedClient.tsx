'use client';

import { useState } from 'react';
import { useGetMany } from 'react-shop';
import { ProductGrid } from 'react-shop-mui/ProductGrid';
import type { Identifier } from 'react-shop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles/createTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ShowMoreButton } from './ShowMoreButton';

export const LatestViewedClient = ({ ids }: { ids: Identifier[] }) => {
  const theme = useTheme();
  const [limit, setLimit] = useState(LIMIT_ON_MOBILE);
  const isMediaMatch = useMediaQuery<Theme>(theme.breakpoints.down('sm'));

  const idsCount = isMediaMatch ? limit : ids.length;

  const { data = [], isPending, error } = useGetMany('products', { ids: ids.slice(0, idsCount) });

  if (error) {
    return 'Something went wrong...';
  }

  return (
    <Box sx={{ mb: 4 }}>
      <ProductGrid
        data={data}
        isPending={isPending}
        total={data?.length}
        placeholderCount={idsCount}
        grid={{ size: { xs: 6, sm: 3, md: 3, lg: 3, xl: 3 } }}
      />
      {isMediaMatch && limit !== ids.length ? (
        <ShowMoreButton handleClick={() => setLimit(ids.length)} />
      ) : null}
    </Box>
  );
};

const LIMIT_ON_MOBILE = 2;
