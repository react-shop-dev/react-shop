import type { ReactNode } from 'react';
import { FlexBox } from 'react-shop-mui/FlexBox';
import Typography from '@mui/material/Typography';

export const OrderReviewHeading = ({
  children,
  icon,
}: {
  icon: ReactNode;
  children: ReactNode;
}) => (
  <FlexBox justifyContent="center" gap={1}>
    {icon}
    <Typography variant="h4">{children}</Typography>
  </FlexBox>
);
