'use client';
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
import { isElement } from 'react-is';
import type { BoxProps } from '@mui/material/Box';
import { ProductListItem } from '../../product/ProductListItem';
import { LoaderList } from '../LoaderList';
import { DefaultListWrapper } from '../DefaultList';

export type ProductListProps = {
  children?: ReactElement | ComponentType;
  listWrapper?: BoxProps;
  total?: number;
  isPending: boolean;
  placeholderCount?: number;
  data: Product[];
};

export const ProductList = (props: ProductListProps) => {
  const { data = [], isPending, placeholderCount, listWrapper, children = ProductListItem } = props;

  if (isPending === true) {
    return <LoaderList count={placeholderCount} {...listWrapper} />;
  }

  return (
    <DefaultListWrapper {...listWrapper}>
      {data.map((record: Product, index: number) => {
        return (
          <RecordContextProvider key={index} value={record}>
            {createOrCloneElement(children, { record })}
          </RecordContextProvider>
        );
      })}
    </DefaultListWrapper>
  );
};

type CreatedElement = string | FunctionComponent<any> | ComponentClass<any, any>;

const createOrCloneElement = (
  element: ReactElement<any, string | JSXElementConstructor<any>> | ComponentType<any>,
  props?: any,
) =>
  isElement(element)
    ? cloneElement(element, props)
    : createElement(element as CreatedElement, props);
