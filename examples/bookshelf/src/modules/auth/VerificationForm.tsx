import { AuthBox } from 'react-shop-mui/AuthBox';
import { AuthFeedback } from 'react-shop-mui/AuthFeedback';
import { Loader } from 'react-shop-mui/Loader';
import { LoginButton } from 'react-shop-mui/LoginButton';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import type { VerificationResponse } from '@/types/auth';

const VerificationForm = ({ result }: { result: VerificationResponse }) => {
  return (
    <AuthBox
      title="Verification"
      logo={result?.type === 'success' ? LockOpenIcon : LockIcon}
      holderStyles={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      sx={{
        p: 2,
      }}
    >
      {!result ? (
        <Loader size={40} />
      ) : (
        <AuthFeedback severity={result.type} message={result.message} />
      )}
      {result?.type === 'success' ? <LoginButton fullWidth /> : null}
    </AuthBox>
  );
};

export default VerificationForm;
