import type { ReactNode } from 'react';
import Paper from '@mui/material/Paper';
import styled from '@mui/material/styles/styled';

export const BottomActions = ({ children }: { children: ReactNode }) => (
  <StyledBottomActions elevation={3}>{children}</StyledBottomActions>
);

const StyledBottomActions = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
  '> *': {
    justifyContent: 'space-evenly',
  },
}));
