'use client';

import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

export const StyledFormLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  rowGap: theme.spacing(1),
  columnGap: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 0,
    paddingRight: 0,
    columnGap: 0,
  },
}));
