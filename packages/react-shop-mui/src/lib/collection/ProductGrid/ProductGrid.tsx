import {
  ReactElement,
  ComponentType,
  cloneElement,
  createElement,
  JSXElementConstructor,
  FunctionComponent,
  ComponentClass,
} from 'react';
import type { Product } from 'react-shop-types';
import { RecordContextProvider } from 'react-shop';
import merge from 'lodash/merge';
import { isElement } from 'react-is';
import MuiGrid, { type Grid2Props as MuiGridProps } from '@mui/material/Grid2';
import { LoaderGrid } from '../LoaderGrid';
import { GridContainer as DefaultGridContainer } from '../GridContainer';
import { ProductGridItem } from '../../product/ProductGridItem';
import type { GridSize } from '@mui/material/Grid';
import type { Breakpoint } from '@mui/material/styles';

export type ProductGridProps = {
  grid?: MuiGridProps;
  children?: ReactElement | ComponentType;
  total?: number;
  isPending: boolean;
  placeholderCount?: number;
  data: Product[];
};

export const ProductGrid = (props: ProductGridProps) => {
  const { data = [], grid = {}, isPending, placeholderCount, children = ProductGridItem } = props;

  const { offset, size, ...gridProps } = grid;

  const cols = getColsForGrid(size as ResponsiveStyleValue<GridSize>);

  if (isPending === true) {
    return <LoaderGrid size={cols} offset={offset} count={placeholderCount} {...gridProps} />;
  }

  return (
    <DefaultGridContainer {...gridProps}>
      {data.map((record: Product, index: number) => {
        return (
          <RecordContextProvider key={index} value={record}>
            <MuiGrid size={cols} offset={offset}>
              {createOrCloneElement(children, { record })}
            </MuiGrid>
          </RecordContextProvider>
        );
      })}
    </DefaultGridContainer>
  );
};

const getColsForGrid = (size?: ResponsiveStyleValue<GridSize>) => {
  if (
    typeof size === 'number' ||
    (typeof size === 'boolean' && size === false) ||
    (typeof size === 'string' && (size === 'auto' || size === 'grow'))
  ) {
    return size;
  }
  return merge({ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }, size ?? {});
};

type ResponsiveStyleValue<T> =
  | T
  | Array<T | null>
  | {
      [key in Breakpoint]?: T | null;
    };

type CreatedElement = string | FunctionComponent<any> | ComponentClass<any, any>;

const createOrCloneElement = (
  element: ReactElement<any, string | JSXElementConstructor<any>> | ComponentType<any>,
  props?: any,
) =>
  isElement(element)
    ? cloneElement(element, props)
    : createElement(element as CreatedElement, props);
