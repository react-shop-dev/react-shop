import { Centered } from 'react-shop-mui/Centered';
import { checkVerification } from '@/lib/auth/actions/checkVerification';
import VerificationForm from '@/modules/auth/VerificationForm';

type SearchParams = Promise<{ email?: string; token?: string }>;

const VerificationPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const result = await checkVerification(searchParams?.email, searchParams?.token);

  return (
    <Centered sx={{ py: 4, bgcolor: 'grey.100' }}>
      <VerificationForm result={result} />
    </Centered>
  );
};

export default VerificationPage;
