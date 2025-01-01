import { Fragment } from 'react';
import { usePrice } from 'react-shop';
import type { Order } from 'react-shop-types';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import OrderReviewItem from '../components/OrderReviewtem';

const OrderReviewTotal = ({ order }: { order: Order }) => {
  const formatPrice = usePrice();

  return (
    <Fragment>
      <OrderReviewItem
        label={
          <Tooltip title="Value excluding taxes and shipping">
            <span>Sub Total*</span>
          </Tooltip>
        }
        node={formatPrice(order?.subtotal)}
      />
      <OrderReviewItem label="Shipping Total" node={formatPrice(Number(order?.shipping_total))} />
      <OrderReviewItem label="Tax Total" node={formatPrice(Number(order?.tax_total))} />
      <Divider />
      <OrderReviewItem label="Total" node={<strong>{formatPrice(order?.total)}</strong>} />
    </Fragment>
  );
};

export default OrderReviewTotal;
