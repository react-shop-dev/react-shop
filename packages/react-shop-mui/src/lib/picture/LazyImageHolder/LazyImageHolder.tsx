import type { ReactNode } from 'react';

import type { SxProps } from '@mui/material/styles';
import { StyledPicture } from './LazyImageHolder.styles';

export type LazyImageHolderProps = {
  children: ReactNode;
  className?: string;
  sx?: SxProps;
};

export const LazyImageHolder = ({ children, ...rest }: LazyImageHolderProps) => (
  <StyledPicture {...rest}>{children}</StyledPicture>
);
