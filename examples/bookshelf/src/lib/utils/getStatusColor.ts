import type { ChipProps } from '@mui/material/Chip';
import { ORDER_STATUS, PAYMENT_STATUS } from '@/lib/constants';

const getStatusColor = (
  status: string | undefined,
  statusColorMapping: Record<string, ChipProps['color']>,
): ChipProps['color'] => (status ? statusColorMapping[status] : 'default');

const ORDER_STATUS_COLOR: Record<string, ChipProps['color']> = {
  [ORDER_STATUS.PENDING]: 'secondary',
  [ORDER_STATUS.REQUIRES_ACTION]: 'info',
  [ORDER_STATUS.COMPLETED]: 'success',
  [ORDER_STATUS.CANCELED]: 'error',
};

export const getOrderStatusColor = (status?: string): ChipProps['color'] =>
  getStatusColor(status, ORDER_STATUS_COLOR);

const PAYMENT_STATUS_COLOR: Record<string, ChipProps['color']> = {
  [PAYMENT_STATUS.AWAITING]: 'secondary',
  [PAYMENT_STATUS.REQUIRES_ACTION]: 'info',
  [PAYMENT_STATUS.CANCELED]: 'error',
  [PAYMENT_STATUS.NOT_PAID]: 'error',
  [PAYMENT_STATUS.CAPTURED]: 'success',
  [PAYMENT_STATUS.REFUNDED]: 'success',
  [PAYMENT_STATUS.PARTIALLY_REFUNDED]: 'info',
};

export const getPaymentStatusColor = (status?: string): ChipProps['color'] =>
  getStatusColor(status, PAYMENT_STATUS_COLOR);
