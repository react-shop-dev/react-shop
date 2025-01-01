'use client';
import { useCallback, memo } from 'react';
import { useListPaginationContext } from 'react-shop';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { SplitButton } from '../SplitButton';

export interface ItemsPerPageProps {
  label?: string;
  itemsPerPageOptions?: number[];
}

export const ItemsPerPage = memo((props: ItemsPerPageProps) => {
  const { label = 'rs.navigation.show', itemsPerPageOptions = defaultItemsPerPageOptions } = props;

  const { perPage, setPerPage } = useListPaginationContext();

  const handlePerPageChange = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      setPerPage(+event.currentTarget.innerText);
    },
    [setPerPage],
  );

  return (
    <SplitButton
      label={label}
      selected={perPage}
      icon={<PostAddIcon fontSize="small" color="inherit" />}
    >
      {({ handleClose }) => (
        <MenuList autoFocusItem>
          {itemsPerPageOptions.map((item: number, index: number) => {
            return (
              <MenuItem
                key={index}
                selected={perPage === item}
                onClick={event => {
                  handlePerPageChange(event);
                  handleClose();
                }}
              >
                {item}
              </MenuItem>
            );
          })}
        </MenuList>
      )}
    </SplitButton>
  );
});

ItemsPerPage.displayName = 'ItemsPerPage';

const defaultItemsPerPageOptions = [5, 12, 24, 50];
