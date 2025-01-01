'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const PREFIX = 'AccountListItem';

export const AccountListItemClasses = {
  grid: `${PREFIX}-grid`,
  actionButtons: `${PREFIX}-actionButtons`,
};

export const StyledAccountListItem = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  marginBottom: theme.spacing(2),
  ['&:last-child']: {
    marginBottom: theme.spacing(4),
  },
  [`& .${AccountListItemClasses.grid}`]: {
    display: 'grid',
    padding: '.6rem 1.2rem',
    gap: 16,
    alignItems: 'center',
    gridTemplateColumns: 'repeat(6, 1fr)',
  },
  [`& .${AccountListItemClasses.actionButtons}`]: {
    display: 'inline-flex',
    justifyContent: 'end',
    gap: '4px',
  },
  [theme.breakpoints.down('sm')]: {
    [`& .${AccountListItemClasses.grid}`]: {
      textAlign: 'center',
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    [`& .${AccountListItemClasses.actionButtons}`]: {
      display: 'none',
    },
  },
}));
