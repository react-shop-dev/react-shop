import { StripeProvider } from 'react-shop-stripe';
import { ShopStripe, ShopStripeProps } from 'react-shop-stripe/server';

const secretKey = process.env.STRIPE_SECRET_KEY;
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_KEY;

const StorePayment = ({ country, children }: Partial<ShopStripeProps>) => {
  return secretKey && publishableKey ? (
    <ShopStripe
      provider={StripeProvider}
      secretKey={secretKey}
      publishableKey={publishableKey}
      country={country}
    >
      {children}
    </ShopStripe>
  ) : (
    <>{children}</>
  );
};

export default StorePayment;
