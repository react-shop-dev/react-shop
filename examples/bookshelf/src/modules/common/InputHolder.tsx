'use client';

import type { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import styled from '@mui/material/styles/styled';

type InputHolderProps = {
  gridColumn?: number;
  sx?: SxProps;
  className?: string;
} & PropsWithChildren;

export const InputHolder = (props: InputHolderProps) => {
  const { children, gridColumn = 12, sx, className } = props;
  return (
    <StyledInputHolder sx={sx} className={className} gridColumn={`span ${gridColumn}`}>
      {children}
    </StyledInputHolder>
  );
};

const StyledInputHolder = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    gridColumn: 'span 12',
  },
}));
