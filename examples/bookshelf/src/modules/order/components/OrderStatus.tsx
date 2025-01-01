import Chip, { ChipProps } from '@mui/material/Chip';
import { getOrderStatusColor } from '@/lib/utils/getStatusColor';

export const OrderStatus = ({ status, ...rest }: { status?: string } & ChipProps) => (
  <Chip
    size="small"
    label={status?.replace('_', ' ')}
    sx={{ textTransform: 'capitalize' }}
    color={getOrderStatusColor(status)}
    {...rest}
  />
);
