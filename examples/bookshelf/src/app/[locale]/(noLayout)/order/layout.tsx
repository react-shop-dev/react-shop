import type { PropsWithChildren } from 'react';
import { OrderReviewLayout } from '@/modules/review/templates/OrderReviewLayout';

const OrderLayout = ({ children }: PropsWithChildren) => {
  return <OrderReviewLayout>{children}</OrderReviewLayout>;
};

export default OrderLayout;
