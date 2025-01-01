import { forwardRef } from 'react';
import { useTranslate, required, email, useAuthProvider } from 'react-shop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextInput } from '../lib/input/TextInput';
import { AuthBoxTitle } from '@auth/AuthBoxTitle';
import { AuthForm } from '@auth/AuthForm';

export type ForgotPasswordData = {
  email: string;
};

export const ForgotPassword = forwardRef((_props, ref) => {
  const translate = useTranslate();
  const { resetPassword } = useAuthProvider();

  return (
    <Box ref={ref} sx={{ p: 3, pt: 0 }}>
      <AuthForm submit={resetPassword} buttonText="Send Email" resetAfterSubmit>
        <AuthBoxTitle title="rs.auth.reset_password" />
        <Typography gutterBottom component="p" variant="caption">
          Please enter your email address.
          <br /> We will send you an email to reset your password.
        </Typography>
        <TextInput
          source="email"
          size="small"
          autoComplete="off"
          label={translate('rs.field.email')}
          validate={[required(), email()]}
        />
      </AuthForm>
    </Box>
  );
});

ForgotPassword.displayName = 'ForgotPassword';
