import type { ReactNode } from 'react';
import type { SxProps } from '@mui/material/styles';
import { FlexBox } from '@views/FlexBox';
import { StyledProductCard } from './ProductCard.styles';

export interface ProductCardProps {
  children: ReactNode;
  sx?: SxProps;
  className?: string;
}

export const ProductCard = ({ className, sx, children }: ProductCardProps) => (
  <StyledProductCard className={className} sx={sx}>
    {children}
  </StyledProductCard>
);

export const ProductCardTile = ({
  children,
  gridMode,
}: {
  gridMode?: boolean;
  children: ReactNode;
}) => (
  <FlexBox
    gap={1}
    justifyContent="space-between"
    flexDirection={gridMode ? 'row' : 'column'}
    sx={{ width: gridMode ? '100%' : 'fit-content' }}
  >
    {children}
  </FlexBox>
);
