'use client';

import { ReactNode } from 'react';
import { FlexBox } from 'react-shop-mui/FlexBox';
import { NextMuiLink } from 'react-shop-mui/NextMuiLink';
import type { Theme } from '@mui/material/styles';

const OrderReviewHolder = ({ children }: { children: ReactNode }) => {
  return (
    <FlexBox
      gap={1}
      flexDirection="column"
      sx={(theme: Theme) => ({
        minWidth: '500px',
        [theme.breakpoints.down('sm')]: {
          minWidth: 'calc(100dvw - 124px)',
        },
      })}
    >
      {children}
      <NextMuiLink href="/" sx={{ mx: 'auto', my: 2 }}>
        Home page
      </NextMuiLink>
    </FlexBox>
  );
};

export default OrderReviewHolder;
