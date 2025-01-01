import { useLineItemInterface, RecordContextProvider } from 'react-shop';
import type { LineItem } from 'react-shop-types';
import get from 'lodash/get';
import TableRow, { type TableRowProps } from '@mui/material/TableRow';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import { styled } from '@mui/material/styles';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import { RemoveFromCart } from './RemoveFromCart';
import { ProductTitle } from '../lib/product/ProductTitle';
import { PriceField } from '../lib/field/PriceField';
import { QuantityInput } from '../lib/input/QuantityInput';
import { ProductPicture } from '../lib/product/ProductPicture';
import { ReferenceField } from '../lib/field/ReferenceField';

export const CartTableRow = ({ item, ...rest }: CartTableRowProps) => {
  const { quantity, price, thumbnail, productId } = useLineItemInterface();
  const isMediaMatch = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  const getPrice = (item?: LineItem) => Number(get(item, price));
  const getQuantity = (item?: LineItem) => Number(get(item, quantity));

  const renderQuantityInput = ({ align = 'center', ...rest }: TableCellProps = {}) =>
    quantity ? (
      <TableCell align={align} {...rest}>
        <QuantityInput
          id={item.id}
          value={getQuantity(item)}
          inStock={item?.variant.inventory_quantity}
        />
      </TableCell>
    ) : null;

  const renderPriceField = ({ align = 'center', ...rest }: TableCellProps = {}) =>
    price ? (
      <TableCell align={align} {...rest}>
        <PriceField flexDirection="column" gap={0} value={getPrice(item) * getQuantity(item)} />
      </TableCell>
    ) : null;

  return (
    <RecordContextProvider value={item}>
      <StyledTableRow {...rest}>
        {thumbnail ? (
          <TableCell>
            <ProductPicture path={thumbnail} sizes="80px" sx={{ width: 65, height: 65 }} />
          </TableCell>
        ) : null}
        <TableCell sx={{ maxWidth: 350, minWidth: 100 }}>
          <ReferenceField source={productId} reference="products">
            <ProductTitle hasLink />
          </ReferenceField>
        </TableCell>
        {!isMediaMatch ? renderQuantityInput() : null}
        {!isMediaMatch ? renderPriceField({ align: 'right' }) : null}
        <TableCell align="center">
          <RemoveFromCart id={item?.id as string} />
        </TableCell>
      </StyledTableRow>
      {isMediaMatch ? (
        <StyledTableRow>
          {renderPriceField()}
          {renderQuantityInput({ align: 'right', colSpan: 2 })}
        </StyledTableRow>
      ) : null}
    </RecordContextProvider>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '> td': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.down('sm')]: {
    '&:nth-of-type(odd)': {
      '> td': {
        border: 'none',
      },
    },
  },
}));

export type CartTableRowProps = { item: LineItem } & TableRowProps;
