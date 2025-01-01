import type { ReactNode } from 'react';
import Box, { type BoxProps } from '@mui/material/Box';
import { ProductGridPlaceholder } from '../../product/GridPlaceholder';

export type SliderLoaderProps = BoxProps & {
  slidesToShow: number;
  cellSpacing: number;
};

export const SliderLoader = ({ slidesToShow, cellSpacing, ...rest }: SliderLoaderProps) => (
  <Box
    display="grid"
    gridTemplateColumns={`repeat(${slidesToShow}, 1fr)`}
    gap={cellSpacing / 8}
    {...rest}
  >
    {times(slidesToShow, key => (
      <ProductGridPlaceholder key={key} />
    ))}
  </Box>
);

const times = (count: number, fn: (key: number) => ReactNode) =>
  Array.from({ length: count }, (_, key) => fn(key));
