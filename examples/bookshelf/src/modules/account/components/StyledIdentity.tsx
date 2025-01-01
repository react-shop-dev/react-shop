'use client';

import { FlexBox } from 'react-shop-mui/FlexBox';
import styled from '@mui/material/styles/styled';

export const StyledIdentity = styled(FlexBox)(({ theme }) => ({
  alignItems: 'center',
  ['& .MuiFormControl-root']: {
    width: '50%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
    ['& .MuiFormControl-root']: {
      width: '100%',
    },
  },
}));
