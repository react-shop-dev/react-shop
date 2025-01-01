import { Fragment } from 'react';
import { TitleBox } from 'react-shop-mui/TitleBox';
import { redirect } from 'next/navigation';
import PaymentIcon from '@mui/icons-material/Payment';
import Alert from '@mui/material/Alert';
import { auth } from '@/auth.config';
import PaymentForm from '@/modules/payment/templates/PaymentForm';

export default async function PaymentPage() {
  const authSession = await auth();

  if (!authSession) {
    redirect('/');
  }

  return (
    <Fragment>
      <TitleBox title="Payment Methods" icon={<PaymentIcon color="primary" />} />
      <Alert severity="warning" sx={{ mb: 2 }}>
        For testing purpose only. Do not provide real payment details
      </Alert>
      <PaymentForm id={authSession.user.id} email={authSession.user.email as string} />
    </Fragment>
  );
}
