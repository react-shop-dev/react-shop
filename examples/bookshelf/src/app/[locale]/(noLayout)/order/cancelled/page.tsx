import { Fragment } from 'react';
import { Title } from 'react-shop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import OrderTitle from '@/modules/order/components/OrderTitle';
import { OrderReviewHeading } from '@/modules/receipt/components/OrderReviewHeading';
import OrderReviewHolder from '@/modules/receipt/templates/OrderReviewHolder';

export default function OrderCancelledPage() {
  return (
    <Fragment>
      <Title title="Order cancelled" />
      <OrderReviewHolder>
        <OrderReviewHeading icon={<ErrorOutlineIcon color="error" fontSize="large" />}>
          Order Failed
        </OrderReviewHeading>
        <OrderTitle>
          Please try again or contact our support team if the problem persists
        </OrderTitle>
      </OrderReviewHolder>
    </Fragment>
  );
}
