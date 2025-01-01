import { Fragment } from 'react';
import type { Payment } from 'react-shop-types';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Divider from '@mui/material/Divider';
import { SvgIcon } from '@/modules/common/SvgIcon';
import OrderTitle from '@/modules/order/components/OrderTitle';
import OrderReviewItem from '../components/OrderReviewtem';

const OrderReviewPayments = ({ payment }: { payment?: Payment }) => (
  <Fragment>
    <OrderTitle>Payment</OrderTitle>
    <OrderReviewItem
      label="Payment Method"
      node={
        payment?.provider_id ? (
          <SvgIcon name="Payment" height="24" width="75" id={payment?.provider_id} />
        ) : null
      }
    />
    {typeof payment?.data?.card_last4 === 'string' ? (
      <OrderReviewItem
        label="Payment Details"
        node={`**** **** **** ${payment?.data?.card_last4}`}
        icon={<CreditScoreIcon fontSize="small" />}
      />
    ) : null}
    <Divider />
  </Fragment>
);

export default OrderReviewPayments;
