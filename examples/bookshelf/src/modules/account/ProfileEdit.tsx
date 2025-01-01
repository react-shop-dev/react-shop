import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { ProfileLayout } from '@/modules/account/templates/ProfileLayout';
import { EditIdentity } from './templates/EditIdentity';
import { EditProfileInfo } from './templates/EditProfileInfo';
import ProfileForm from './templates/ProfileForm';

const ProfileEdit = async () => {
  const authSession = await auth();

  if (!authSession?.user) {
    redirect('/');
  }

  return (
    <ProfileForm user={authSession.user}>
      <ProfileLayout identity={<EditIdentity />}>
        <EditProfileInfo />
      </ProfileLayout>
    </ProfileForm>
  );
};

export default ProfileEdit;
