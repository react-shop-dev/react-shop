import type { ReactNode } from 'react';
import type { BoxProps } from '@mui/material/Box';
import { ProductListPlaceholder } from '../../product/ListPlaceholder';
import { DefaultListWrapper } from '../DefaultList';

export interface LoaderListProps extends BoxProps {
  count?: number;
}

const times = (count: number, fn: (key: number) => ReactNode) =>
  Array.from({ length: count }, (_, key) => fn(key));

export const LoaderList = (props: LoaderListProps) => {
  const { count = DEFAULT_COUNT, ...rest } = props;

  return (
    <DefaultListWrapper {...rest}>
      {times(count, key => (
        <ProductListPlaceholder key={key} />
      ))}
    </DefaultListWrapper>
  );
};

const DEFAULT_COUNT = 5;
