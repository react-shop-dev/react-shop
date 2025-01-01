'use client';

import Card from '@mui/material/Card';
import { styled, darken } from '@mui/material/styles';

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  gap: '10px',
  transition: 'box-shadow 250ms ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
  ...theme.applyStyles('dark', {
    transition: 'background-color 250ms ease-in-out',
    '&:hover': {
      backgroundColor: darken(theme.palette.background.paper, 0.2),
    },
  }),
}));
