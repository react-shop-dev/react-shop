import { Fragment, Suspense } from 'react';
import { TitleBox } from 'react-shop-mui/TitleBox';
import PersonIcon from '@mui/icons-material/Person';
import ProfileEdit from '@/modules/account/ProfileEdit';
import ProfileShow from '@/modules/account/ProfileShow';
import { ProfilePlaceholder } from '@/modules/account/skeletons/ProfilePlaceholder';
import { ProfileActions } from '@/modules/account/templates/ProfileActions';

type ProfilePageLayoutProps = { searchParams: Promise<{ edit?: boolean }> };

const ProfilePage = async (props: ProfilePageLayoutProps) => {
  const searchParams = await props.searchParams;

  const isEdit = searchParams.edit;

  const title = `${isEdit ? 'Edit ' : ''}Profile`;

  return (
    <Fragment>
      <TitleBox title={title} icon={<PersonIcon color="primary" />}>
        <ProfileActions isEdit={isEdit} />
      </TitleBox>
      <Suspense fallback={<ProfilePlaceholder />}>
        {isEdit ? <ProfileEdit /> : <ProfileShow />}
      </Suspense>
    </Fragment>
  );
};

export default ProfilePage;
