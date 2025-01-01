'use client';

import { FlexBox } from 'react-shop-mui/FlexBox';
import styled from '@mui/material/styles/styled';

export const StyledProfileInfo = styled(FlexBox)(({ theme }) => ({
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  gap: 16,
  [theme.containerQueries.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}));
