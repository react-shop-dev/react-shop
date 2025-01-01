import { useCallback, MouseEvent } from 'react';
import { useListContext } from 'react-shop';
import type { Identifier, Product } from 'react-shop-types';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { Button, type ButtonProps } from '@button/Button';

export const SelectAllButton = (props: ButtonProps) => {
  const { data = [], selectedIds = [], onSelect = noop } = useListContext();

  const ids = data.map((record: Product) => record.id);

  const isAllSelected =
    selectedIds.length && ids.every((id: Identifier) => selectedIds.includes(id));

  const handleSelectAll = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();

      if (!isAllSelected) {
        const allItems = selectedIds.concat(
          data
            .filter((record: any) => !selectedIds.includes(record.id))
            .map((record: any) => record.id),
        );
        onSelect(allItems);
      } else {
        onSelect([]);
      }
    },
    [selectedIds, data, onSelect, isAllSelected],
  );

  return (
    <Button
      size="small"
      onClick={handleSelectAll}
      label={isAllSelected ? 'rs.action.deselect' : 'rs.action.selectAll'}
      variant={isAllSelected ? 'contained' : 'outlined'}
      {...props}
    >
      {isAllSelected ? <RemoveDoneIcon /> : <DoneAllIcon />}
    </Button>
  );
};

const noop = () => undefined;
