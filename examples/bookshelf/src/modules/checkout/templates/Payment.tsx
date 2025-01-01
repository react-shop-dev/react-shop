import { CheckoutFormToolbar } from '../components/CheckoutFormToolbar';
import PaymentOptions from '../components/PaymentOptions';
import CheckoutFormLayout, { type CheckoutFormElementProps } from './CheckoutFormLayout';
import StripeCard from './StripeCard';

const Payment = ({
  title = 'rs.checkout.payment',
  isStripe,
  step,
  ...rest
}: CheckoutFormElementProps & { isStripe?: boolean }) => {
  return (
    <CheckoutFormLayout toolbar={<CheckoutFormToolbar title={title} step={step} />} {...rest}>
      <PaymentOptions />
      {isStripe ? <StripeCard /> : null}
    </CheckoutFormLayout>
  );
};

export default Payment;
