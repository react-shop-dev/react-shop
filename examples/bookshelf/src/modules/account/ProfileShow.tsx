import { GetOneProvider } from 'react-shop';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { STORAGE_USER_PREFIX } from '@/lib/constants';
import { demoUserCheck } from '@/lib/customer/getCustomerFromDB';
import { OrderCount } from '@/modules/account/components/OrderCount';
import { ProfileIdentity } from '@/modules/account/components/ProfileIdentity';
import { ProfileInfo } from '@/modules/account/templates/ProfileInfo';
import { ProfileLayout } from '@/modules/account/templates/ProfileLayout';

export default async function ProfileShow() {
  const authSession = await auth();

  if (!authSession?.user) {
    redirect('/');
  }

  const id = authSession.user.id;
  const email = authSession.user.email as string;
  const isDemoUser = demoUserCheck(email);

  return (
    <GetOneProvider
      id={id}
      hydration={isDemoUser}
      resource={isDemoUser ? 'customers' : STORAGE_USER_PREFIX}
    >
      <ProfileLayout identity={<ProfileIdentity />} rightbar={<OrderCount />}>
        <ProfileInfo />
      </ProfileLayout>
    </GetOneProvider>
  );
}
