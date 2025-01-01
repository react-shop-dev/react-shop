import Box, { BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';
import styled from '@mui/material/styles/styled';

export const StyledProductStatus: StyledComponent<BoxProps> = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  ['&:empty']: {
    display: 'none',
  },
}));
