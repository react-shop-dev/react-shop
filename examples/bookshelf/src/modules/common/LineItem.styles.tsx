'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledLineItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '> div:last-child': {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },
}));

export const StyledPriceHolder = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '100px',
  justifyContent: 'center',
  alignItems: 'flex-end',
});
