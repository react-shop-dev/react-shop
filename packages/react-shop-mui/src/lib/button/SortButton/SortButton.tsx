'use client';
import type { ReactElement } from 'react';
import { useTranslate, useListSortContext, SortPayload } from 'react-shop';
import get from 'lodash/get';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SortIcon from '@mui/icons-material/Sort';
import { SplitButton } from '../SplitButton';

/**
 * @example
 * Option 1: '<field>:<order>' : <label>
 * Option 2: '<field>:<order>' : null
 * Option 3: '<field>' : <label>
 * Option 4: '<field>' : null
 */

export interface SortButtonProps {
  label?: ReactElement | string | false;
  options: { [key: string]: string | null };
}

export const SortButton = (props: SortButtonProps) => {
  const { label = 'rs.action.sort', options = {} } = props;

  const translate = useTranslate();

  const { sort, setSort } = useListSortContext();

  const handleChangeSort = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const field = event.currentTarget.dataset.sort as string;
    const order = event.currentTarget.dataset.order;

    if (field === sort.field && order === sort.order) return;

    const finalOrder = order ? order : field === sort.field ? inverseOrder(sort.order) : 'DESC';

    setSort({
      field,
      order: finalOrder as SortPayload['order'],
    });
  };

  return (
    <SplitButton
      label={label}
      ariaLabel="Sorting"
      icon={<SortIcon fontSize="small" color="inherit" />}
      selected={translate(
        get(
          options,
          [`${sort.field}:${sort.order}`],
          get(options, [`${sort.field}`]) ?? `${sort.field} (${sort.order})`,
        ) as string,
      )}
    >
      {({ handleClose }: { handleClose: () => void }) => (
        <MenuList autoFocusItem>
          {Object.keys(options).map(key => {
            const [field, order] = key.split(':');
            return (
              <MenuItem
                key={key}
                data-sort={field}
                data-order={order}
                selected={sort.field === field && sort.order === order}
                onClick={event => {
                  handleChangeSort(event);
                  handleClose();
                }}
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                {order
                  ? translate(options[key] || field)
                  : `${translate(`rs.sort.${field}`, { _: field })} (
                      ${inverseOrder(sort.order)})`}
              </MenuItem>
            );
          })}
        </MenuList>
      )}
    </SplitButton>
  );
};

const inverseOrder = (sort: 'ASC' | 'DESC') => (sort === 'ASC' ? 'DESC' : 'ASC');
