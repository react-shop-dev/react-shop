import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import MuiPagination, { type PaginationProps } from '@mui/material/Pagination';

const PREFIX = 'ShopPagination';

export const StyledPagination: StyledComponent<PaginationProps> = styled(MuiPagination, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  display: 'flex',
  justifyContent: 'center',
});
