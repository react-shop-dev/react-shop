import { PropsWithChildren } from 'react';
import { CheckoutProvider } from 'react-shop';
import { Header } from 'react-shop-mui/Header';
import { PageView } from 'react-shop-mui/PageView';
import { cookies } from 'next/headers';
import { onSuccessPlaceOrder } from '@/lib/data/actions';
import { ScrollToTop } from '@/modules/common/ScrollToTop';

export default async function CheckoutLayout({ children }: PropsWithChildren) {
  const pageCookies = await cookies();
  const country = pageCookies.get('_shop_country')?.value;

  return (
    <CheckoutProvider onSuccessPlaceOrder={onSuccessPlaceOrder}>
      <ScrollToTop />
      <Header
        showBottomActions={false}
        searchBar={<Noop />}
        actions={country ? <>Country: {country?.toUpperCase()}</> : <Noop />}
      />
      <PageView sx={{ bgcolor: 'grey.100', minHeight: 'calc(100dvh - 78px)' }}>{children}</PageView>
    </CheckoutProvider>
  );
}

const Noop = () => <>{null}</>;
