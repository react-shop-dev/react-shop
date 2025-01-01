import { ProductStatus } from 'react-shop-mui/ProductStatus';
import type { ProductVariant } from 'react-shop-types';
import Typography from '@mui/material/Typography';
import { STOCK_STATUS } from '@/lib/constants';

export const Status = ({ variant }: { variant?: ProductVariant }) => {
  return (
    <ProductStatus
      variant={variant}
      label={StatusLabel}
      OutStockIcon={Noop}
      iconProps={{ fontSize: 'medium' }}
    />
  );
};

const StatusLabel = ({ inStock, status, ...rest }: { inStock?: boolean; status?: string }) => {
  if (status === STOCK_STATUS.preOrder) {
    return <Typography {...typographyProps}>{status}</Typography>;
  }

  return inStock ? <Typography {...typographyProps} {...rest} /> : <Noop />;
};

const typographyProps = {
  fontSize: '18px',
  color: 'grey.600',
};

const Noop = () => <>{null}</>;
