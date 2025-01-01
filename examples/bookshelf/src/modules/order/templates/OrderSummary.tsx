import { Fragment } from 'react';
import Summary, { SummaryProps } from '@/modules/common/Summary';
import OrderTitle from '../components/OrderTitle';

type OrderSummaryProps = SummaryProps;

export const OrderSummary = (props: OrderSummaryProps) => {
  return (
    <Fragment>
      <OrderTitle>Order Summary</OrderTitle>
      <Summary {...props} />
    </Fragment>
  );
};
