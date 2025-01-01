import type { FC, ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const IteratorWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent sx={{ pb: 2, px: 1 }}>{children}</CardContent>
  </Card>
);
