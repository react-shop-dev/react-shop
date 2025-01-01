import type { ReactNode } from 'react';
import Box, { type BoxProps } from '@mui/material/Box';

export interface FlexBoxProps extends BoxProps {
  component?: React.ElementType;
  children: ReactNode;
}

export const FlexBox: React.FC<FlexBoxProps> = ({ children, ...props }) => {
  return (
    <Box display="flex" {...props}>
      {children}
    </Box>
  );
};
