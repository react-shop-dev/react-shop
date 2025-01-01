import { Fragment, Children, ReactNode } from 'react';
import type { ToolbarProps } from '@mui/material/Toolbar';
import type { SxProps } from '@mui/material/styles';
import { SwitchViewMode } from '@button/SwitchViewMode';
import { ItemsPerPage } from '@button/ItemsPerPage';
import { StyledPageToolbar } from './PageToolbar.styles';

export const PageToolbar = ({
  sortButton,
  itemsPerPage = <ItemsPerPage />,
  switchViewMode = <SwitchViewMode />,
  variant = 'dense',
  sx,
  children,
  ...rest
}: PageToolbarProps) => {
  return (
    <StyledPageToolbar variant={variant} sx={sx} {...rest}>
      {Children.count(children) > 0 ? (
        children
      ) : (
        <Fragment>
          {sortButton}
          {itemsPerPage}
          {switchViewMode}
        </Fragment>
      )}
    </StyledPageToolbar>
  );
};

export type PageToolbarProps = Omit<ToolbarProps, 'sx'> & {
  sortButton?: ReactNode;
  itemsPerPage?: ReactNode;
  switchViewMode?: ReactNode;
  sx?: SxProps;
};
