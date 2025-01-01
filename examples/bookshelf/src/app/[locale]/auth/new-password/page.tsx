import { Centered } from 'react-shop-mui/Centered';
import { newPasswordAction } from '@/lib/auth/actions/newPassword';
import { ChangePasswordForm } from '@/modules/auth/ChangePasswordForm';

type SearchParams = Promise<{ email?: string; token?: string }>;

const NewPassordPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  return (
    <Centered sx={{ py: 4, bgcolor: 'grey.100' }}>
      <ChangePasswordForm
        formAction={newPasswordAction}
        token={searchParams?.token}
        email={searchParams?.email}
      />
    </Centered>
  );
};

export default NewPassordPage;
