'use client';
import type { ReactNode, ElementType } from 'react';
import { useIsLoaded } from 'react-shop';
import type { LineItem } from 'react-shop-types';
import Table, { type TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { CartTableWrapper } from './CartTableWrapper';
import { CartTableRow } from './CartTableRow';
import { CartPlaceholder } from './CartPlaceholder';

export type CartTableProps = TableProps & {
  data: LineItem[];
  isLoading?: boolean;
  footer?: ReactNode;
  wrapper?: ElementType;
};

export const CartTable = (props: CartTableProps) => {
  const {
    data: cartItems,
    isLoading,
    footer,
    wrapper: Wrapper = CartTableWrapper,
    ...rest
  } = props;

  const loaded = useIsLoaded(isLoading);

  if (!loaded) {
    return <CartPlaceholder />;
  }

  return (
    <Wrapper in={!!cartItems.length}>
      <Table size="small" {...rest}>
        <TableBody>
          {cartItems.map((item: LineItem) => (
            <CartTableRow key={item.id} item={item} />
          ))}
        </TableBody>
        {footer}
      </Table>
    </Wrapper>
  );
};
