import type { PropsWithChildren } from 'react';
import type { SxProps } from '@mui/material/styles';
import { StyledCentered } from './Centered.styles';

export const Centered = ({ sx, children }: PropsWithChildren & { sx?: SxProps }) => (
  <StyledCentered sx={sx}>{children}</StyledCentered>
);
