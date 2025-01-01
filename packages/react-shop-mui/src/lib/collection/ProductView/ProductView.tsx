'use client';
import { ReactElement, ComponentType } from 'react';
import {
  ListView,
  ViewMode,
  ListViewProps,
  ListViewParams,
  useAtomValue,
  viewModeState,
} from 'react-shop';
import { Pagination as DefaultPagination } from '../Pagination';
import { ProductGrid, type ProductGridProps } from '../ProductGrid';
import { Empty as DefaultEmpty } from '../Empty';
import { ProductList, type ProductListProps } from '../ProductList';
import { NoResults } from '../NoResults';

export interface ProductViewProps extends Omit<ListViewProps, 'children'> {
  gridItem?: ReactElement | ComponentType;
  listItem?: ReactElement | ComponentType;
  allowSwitchView?: boolean;
  grid?: ProductGridProps['grid'];
  listWrapper?: ProductListProps['listWrapper'];
}

const defaultPagination = <DefaultPagination />;
const defaultEmpty = <DefaultEmpty />;

export const ProductView = (props: ProductViewProps) => {
  const {
    pagination = defaultPagination,
    empty = defaultEmpty,
    allowSwitchView = false,
    grid,
    listWrapper,
    gridItem,
    listItem,
  } = props;

  const mode = useAtomValue(viewModeState);

  const renderView = ({ data, total, isPending }: ListViewParams) => {
    if (!isPending && (data == null || data.length === 0 || total === 0)) {
      return <NoResults />;
    }

    return mode === ViewMode.list && allowSwitchView ? (
      <ProductList listWrapper={listWrapper} {...{ data, total, isPending }}>
        {listItem}
      </ProductList>
    ) : (
      <ProductGrid grid={grid} {...{ data, total, isPending }}>
        {gridItem}
      </ProductGrid>
    );
  };

  return (
    <ListView pagination={pagination} empty={empty}>
      {renderView}
    </ListView>
  );
};
