'use client';

import { AuthBox } from 'react-shop-mui/AuthBox';
import { AuthForm } from 'react-shop-mui/AuthForm';
import { PasswordInput } from 'react-shop-mui/PasswordInput';
import KeyIcon from '@mui/icons-material/Key';
import type { NewPasswordAction } from '@/lib/auth/actions/newPassword';
import { changePasswordSchema } from '@/lib/auth/schemas';
import { yupResolver } from '@hookform/resolvers/yup';

export const ChangePasswordForm = ({
  token,
  email,
  formAction,
}: {
  formAction: NewPasswordAction;
  token?: string;
  email?: string;
}) => {
  const handleSubmit = async (values: { password: string; confirmPassword: string }) =>
    formAction(values, token, email);

  return (
    <AuthBox
      title="New Password"
      logo={KeyIcon}
      holderStyles={{ px: 2 }}
      sx={{
        p: 2,
      }}
    >
      <AuthForm
        submit={handleSubmit}
        // @ts-ignore missing the following properties from type 'ObjectSchema'
        resolver={yupResolver<Record<string, any>>(changePasswordSchema)}
        buttonText="Update password"
      >
        <PasswordInput source="password" label="rs.field.password" />
        <PasswordInput source="confirmPassword" label="rs.field.confirm_password" />
      </AuthForm>
    </AuthBox>
  );
};
