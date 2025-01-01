import type { ComponentType } from 'react';
import { email, required, useAuthProvider, useTranslate } from 'react-shop';
import { AuthForm } from '@auth/AuthForm';
import { TextInput } from '../lib/input/TextInput';
import { PasswordInput } from '../lib/input/PasswordInput';
import { PolicyLink as DefaultPolicyLink } from './PolicyLink';

export type SignUpProps = {
  policyLink?: ComponentType | false;
};

export const SignUp = (props: SignUpProps) => {
  const { policyLink: PolicyLink = DefaultPolicyLink } = props;

  const { signUp } = useAuthProvider();
  const translate = useTranslate();

  return (
    <AuthForm submit={signUp} buttonText="Sign Up" resetAfterSubmit>
      <TextInput
        source="first_name"
        autoComplete="off"
        size="small"
        label={translate('rs.field.firstName')}
      />
      <TextInput
        source="last_name"
        autoComplete="off"
        size="small"
        label={translate('rs.field.lastName')}
      />
      <TextInput
        source="email"
        autoComplete="email"
        size="small"
        label={translate('rs.field.email')}
        validate={[required(), email()]}
      />
      <PasswordInput
        source="password"
        size="small"
        label={translate('rs.field.password')}
        validate={[required()]}
      />
      {PolicyLink !== false ? <PolicyLink /> : null}
    </AuthForm>
  );
};
