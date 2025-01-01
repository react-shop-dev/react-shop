import { useMemo, useCallback, ChangeEvent } from 'react';
import { useListPaginationContext } from 'react-shop';
import { type PaginationProps as MuiPaginationProps } from '@mui/material/Pagination';
import Toolbar from '@mui/material/Toolbar';
import { StyledPagination } from './Pagination.styles';

export type PaginationProps = MuiPaginationProps;

export const Pagination = (props: PaginationProps) => {
  const { shape = 'rounded', size = 'medium', color = 'standard', ...rest } = props;

  const { total, page, perPage, setPage, isPending } = useListPaginationContext();

  const totalPages = useMemo(
    () => (total != null ? Math.ceil(total / perPage) : undefined),
    [perPage, total],
  );

  const handlePerPage = useCallback(
    (event: ChangeEvent<unknown>, page: number) => {
      event.stopPropagation();
      setPage(page);
    },
    [setPage],
  );

  if (isPending) {
    return <Toolbar variant="dense" />;
  }

  if (total === 0 || page < 1 || (totalPages && page > totalPages)) {
    return null;
  }

  return (
    <StyledPagination
      page={page}
      color={color}
      onChange={handlePerPage}
      count={totalPages}
      size={size}
      shape={shape}
      {...rest}
    />
  );
};
