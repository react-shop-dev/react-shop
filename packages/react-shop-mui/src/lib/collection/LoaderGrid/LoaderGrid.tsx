import type { ReactNode } from 'react';
import Grid, { type Grid2Props } from '@mui/material/Grid2';
import { ProductGridPlaceholder } from '../../product/GridPlaceholder';
import { GridContainer as DefaultGridContainer } from '../GridContainer';

export interface LoaderGridProps extends Grid2Props {
  count?: number;
}

const times = (count: number, fn: (key: number) => ReactNode) =>
  Array.from({ length: count }, (_, key) => fn(key));

export const LoaderGrid = (props: LoaderGridProps) => {
  const { count = DEFAULT_COUNT, size, offset, ...rest } = props;

  return (
    <DefaultGridContainer {...rest}>
      {times(count, key => (
        <Grid key={key} size={size} offset={offset}>
          <ProductGridPlaceholder />
        </Grid>
      ))}
    </DefaultGridContainer>
  );
};

const DEFAULT_COUNT = 6;
