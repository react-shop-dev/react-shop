'use client';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import type { SxProps } from '@mui/material/styles';
import { StyledLoader } from './Loader.styles';

type LoaderProps = CircularProgressProps & {
  className?: string;
  sx?: SxProps;
};

export const Loader = (props: LoaderProps) => {
  const { className, size = 60, color = 'primary', sx } = props;

  return (
    <StyledLoader sx={sx}>
      <CircularProgress size={size} className={className} color={color} thickness={4} />
    </StyledLoader>
  );
};
