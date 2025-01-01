import type { ReactNode } from 'react';
import MuiGrid, { type Grid2Props as MuiGridProps } from '@mui/material/Grid2';
import { StyledGridContainer } from './GridContainer.styles';

export const GridContainer: React.FC<MuiGridProps & { children: ReactNode }> = ({
  rowSpacing = 2,
  columnSpacing = { xs: 1, sm: 1, md: 2, lg: 3 },
  alignItems = 'stretch',
  children,
  sx,
  ...props
}) => (
  <StyledGridContainer sx={sx}>
    <MuiGrid
      container
      rowSpacing={rowSpacing}
      alignItems={alignItems}
      columnSpacing={columnSpacing}
      {...props}
    >
      {children}
    </MuiGrid>
  </StyledGridContainer>
);
