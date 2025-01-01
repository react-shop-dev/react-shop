'use client';

import { FlexBox } from 'react-shop-mui/FlexBox';
import styled from '@mui/material/styles/styled';

export const StyledOrderTopbar = styled(FlexBox)({
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  containerType: 'inline-size',
  '> *': {
    ['@container (max-inline-size: 600px)']: {
      width: '100%',
    },
  },
});
