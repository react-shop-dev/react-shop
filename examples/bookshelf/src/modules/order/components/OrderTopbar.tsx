import { type ReactNode } from 'react';
import { FlexBox } from 'react-shop-mui/FlexBox';
import type { Order } from 'react-shop-types';
import Typography from '@mui/material/Typography';
import { getPaymentStatusColor } from '@/lib/utils/getStatusColor';
import { format as dateFormat } from 'date-fns';
import { OrderStatus } from './OrderStatus';
import { StyledOrderTopbar } from './OrderTopbar.styles';

export const OrderTopbar = ({ created_at, status, payment_status }: OrderTopbarProps) => (
  <StyledOrderTopbar>
    {status ? (
      <TopBarItem label="Order status">
        <OrderStatus status={status} />
      </TopBarItem>
    ) : null}
    {created_at ? (
      <TopBarItem label="Placed on">
        <Typography component="time">{dateFormat(created_at, 'dd MMM, yyyy')}</Typography>
      </TopBarItem>
    ) : null}
    {payment_status ? (
      <TopBarItem label="Payment status">
        <OrderStatus status={payment_status} color={getPaymentStatusColor(payment_status)} />
      </TopBarItem>
    ) : null}
  </StyledOrderTopbar>
);

const TopBarItem = ({ label, children }: { label: string; children: ReactNode }) => (
  <FlexBox gap={1} alignItems="center">
    <Typography color="grey.600">{label}:</Typography>
    {children}
  </FlexBox>
);

type OrderTopbarProps = Partial<Pick<Order, 'created_at' | 'status' | 'payment_status'>>;
