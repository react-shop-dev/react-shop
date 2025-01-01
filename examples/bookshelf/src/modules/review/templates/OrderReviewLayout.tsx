import type { ReactNode } from 'react';
import { Centered } from 'react-shop-mui/Centered';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const OrderReviewLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Centered sx={{ bgcolor: 'grey.100', minHeight: '100dvh', py: 4, px: 2 }}>
      <Card sx={{ maxWidth: '600px' }}>
        <CardContent>{children}</CardContent>
      </Card>
    </Centered>
  );
};
