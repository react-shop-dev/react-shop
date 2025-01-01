import styled from '@mui/material/styles/styled';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import type { StyledComponent } from '@emotion/styled';

export const StyledMenuItem: StyledComponent<MenuItemProps> = styled(MenuItem)(({ theme }) => ({
  color: 'inherit',
  fontSize: 'inherit',
  cursor: 'pointer',
  justifyContent: 'space-between',
  transition: 'color 150ms ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));
