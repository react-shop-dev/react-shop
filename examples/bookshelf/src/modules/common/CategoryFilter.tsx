import { Fragment } from 'react';
import type { AsideProps } from 'react-shop-mui/Aside';
import { Filter } from 'react-shop-mui/Filter';
import { FilterInputGroup } from 'react-shop-mui/FilterInputGroup';
import { STOCK_STATUS } from '@/lib/constants';
import { startOfMonth } from 'date-fns/startOfMonth';
import { subMonths } from 'date-fns/subMonths';
import type { Color, Format, StoreItemType } from '@/types';

const formats: Format[] = ['Paperback', 'E-book', 'Hardcover'];
const colors: Color[] = ['Black', 'Silver', 'Gold'];

export const CategoryFilter: React.FC<AsideProps & { type: StoreItemType }> = ({
  type,
  ...props
}) => {
  return (
    <Filter cardProps={{ elevation: 1, sx: { py: 2 } }} {...props}>
      <FilterInputGroup
        title="Sales"
        optionValue="value"
        source="sales_gt"
        choices={[
          { id: 1, name: 'Best sellers', value: 2800 },
          { id: 2, name: 'Popular', value: 2000 },
        ]}
      />
      <FilterInputGroup
        title="Status"
        optionValue="value"
        source="stock_status"
        defaultExpanded={false}
        choices={[
          { id: 'in-stock', name: 'In Stock', value: STOCK_STATUS.inStock },
          {
            id: 'out-of-stock',
            name: 'Out of stock',
            value: STOCK_STATUS.outOfStock,
          },
          {
            id: 'pre-order',
            name: 'Pre-order',
            value: STOCK_STATUS.preOrder,
          },
        ]}
      />
      {type === 'book' ? (
        <Fragment>
          <FilterInputGroup
            title="Format"
            source="format"
            defaultExpanded={false}
            choices={formats.map(format => ({
              id: format,
              name: format,
            }))}
          />
          <FilterInputGroup
            title="Published At"
            optionValue="value"
            source="published_gte"
            defaultExpanded={false}
            choices={[
              {
                id: 1,
                name: 'Recent two months',
                value: subMonths(startOfMonth(new Date()), 2).toISOString(),
              },
              {
                id: 2,
                name: 'Last 6 months',
                value: subMonths(startOfMonth(new Date()), 6).toISOString(),
              },
            ]}
          />
        </Fragment>
      ) : null}
      {type === 'accessory' ? (
        <FilterInputGroup
          title="Color"
          source="color"
          defaultExpanded={false}
          choices={colors.map(color => ({
            id: color,
            name: color,
          }))}
        />
      ) : null}
    </Filter>
  );
};
