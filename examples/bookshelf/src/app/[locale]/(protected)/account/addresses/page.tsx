import { GetOneProvider } from 'react-shop';
import { TitleBox } from 'react-shop-mui/TitleBox';
import { redirect } from 'next/navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { auth } from '@/auth.config';
import { STORAGE_USER_PREFIX } from '@/lib/constants';
import { demoUserCheck } from '@/lib/customer/getCustomerFromDB';
import { AddAddressButton } from '@/modules/addresses/components/AddAddressButton';
import { AddressModal } from '@/modules/addresses/templates/AddressModal';
import { AdressBook } from '@/modules/addresses/templates/AdressBook';

type SearchParams = Promise<{ id?: string }>;

export default async function AdressesPage({ searchParams }: { searchParams: SearchParams }) {
  const authSession = await auth();
  const addressId = (await searchParams).id;

  if (!authSession?.user) {
    redirect('/');
  }
  const id = authSession.user.id;
  const isDemoUser = demoUserCheck(authSession.user.email);

  return (
    <GetOneProvider id={id} resource={isDemoUser ? 'customers' : STORAGE_USER_PREFIX}>
      <TitleBox title="Addresses" icon={<LocationOnIcon color="primary" />}>
        <AddAddressButton />
      </TitleBox>
      <AdressBook />
      {addressId ? <AddressModal id={addressId} dialogTitle="Edit address" /> : null}
    </GetOneProvider>
  );
}
