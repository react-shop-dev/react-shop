'use client';

import Stack from '@mui/material/Stack';
import styled from '@mui/material/styles/styled';

export const StyledFormStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
  },
}));
