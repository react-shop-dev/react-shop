import { Suspense } from 'react';
import { auth } from '@/auth.config';
import { PAYMENTS } from '@/lib/constants';
import { getCustomerFromDB } from '@/lib/customer/getCustomerFromDB';
import { fetchLocation } from '@/lib/data/fetch';
import StorePayment from './StorePayment';
import StorePaymentAdapter from './StorePaymentAdapter';
import CheckoutForm from './components/CheckoutForm';
import CheckoutPaymentButton from './components/CheckoutPaymentButton';
import CheckoutTermsInfo from './components/CheckoutTermsInfo';
import DeliveryPlaceholder from './skeletons/DeliveryPlaceholder';
import Address from './templates/Address';
import Delivery from './templates/Delivery';
import Payment from './templates/Payment';
import StoreStripeActions from './templates/StoreStripeActions';

const CheckoutMain = async ({ payment }: { payment?: string }) => {
  const session = await auth();
  const customer = await getCustomerFromDB(session?.user.id, session?.user.email);
  const location = await fetchLocation();

  const country = location?.country_code;
  const city = location?.city;

  const isStripe = payment === PAYMENTS.STRIPE;

  return (
    <StorePayment country={country}>
      <CheckoutForm
        payment={payment}
        defaultValues={{
          email: customer?.email,
          first_name: customer?.first_name ?? customer?.name?.split(' ')[0],
          last_name: customer?.last_name ?? customer?.name?.split(' ')[1],
          phone: customer?.phone,
          address: customer?.shipping_addresses?.[0],
        }}
      >
        <Address hasAccount={customer?.has_account} step={1} country={country} city={city} />
        <Suspense fallback={<DeliveryPlaceholder />}>
          <Delivery step={2} />
        </Suspense>
        <StorePaymentAdapter payment={payment}>
          <Payment step={3} isStripe={isStripe} />
          <CheckoutTermsInfo />
          {isStripe ? <StoreStripeActions /> : null}
          <CheckoutPaymentButton />
        </StorePaymentAdapter>
      </CheckoutForm>
    </StorePayment>
  );
};

export default CheckoutMain;
