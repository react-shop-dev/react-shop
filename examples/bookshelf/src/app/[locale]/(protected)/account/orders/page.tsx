import { Fragment } from 'react';
import { GetListBase, ListView } from 'react-shop';
import { Empty } from 'react-shop-mui/Empty';
import { Pagination } from 'react-shop-mui/Pagination';
import { TitleBox } from 'react-shop-mui/TitleBox';
import { redirect } from 'next/navigation';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { auth } from '@/auth.config';
import OrdersList from '@/modules/order/templates/OrdersList';

export default async function OrdersPage() {
  const authSession = await auth();

  if (!authSession?.user) {
    redirect('/');
  }

  return (
    <Fragment>
      <TitleBox title="My Orders" icon={<ShoppingBagIcon color="primary" />} />
      <GetListBase resource="orders" perPage={5} filter={{ customer_id: authSession.user.id }}>
        <ListView pagination={<Pagination />} empty={<Empty />}>
          <OrdersList />
        </ListView>
      </GetListBase>
    </Fragment>
  );
}
