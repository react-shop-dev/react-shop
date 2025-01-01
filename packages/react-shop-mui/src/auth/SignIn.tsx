import { SetStateAction, Fragment } from 'react';
import { required, useTranslate, email, useSignIn, AuthProvidersData } from 'react-shop';
import { PasswordInput } from '../lib/input/PasswordInput';
import { TextInput } from '../lib/input/TextInput';
import { ForgotPasswordLink } from './ForgotPasswordLink';
import { AuthForm } from '@auth/AuthForm';
import { SocialAuth } from './SocialAuth';

export interface SignInFormProps {
  allowForgot?: boolean;
  hasPasswordAuth?: boolean;
  data?: AuthProvidersData;
  redirectToForgotPassword: () => SetStateAction<void>;
}

export const SignIn = (props: SignInFormProps) => {
  const { data, allowForgot, redirectToForgotPassword, hasPasswordAuth } = props;

  const translate = useTranslate();
  const login = useSignIn(hasPasswordAuth ? 'credentials' : 'nodemailer');

  return (
    <Fragment>
      {data?.redirectable?.length ? (
        <AuthForm submit={login} buttonText="Sign In">
          <Fragment>
            <TextInput
              source="email"
              autoComplete="off"
              size="small"
              label={translate('rs.field.email')}
              validate={[required(), email()]}
            />
            {hasPasswordAuth ? (
              <PasswordInput
                source="password"
                size="small"
                label={translate('rs.field.password')}
                validate={required()}
              />
            ) : null}
          </Fragment>
          {allowForgot ? (
            <div>
              <ForgotPasswordLink handleClick={redirectToForgotPassword} />
            </div>
          ) : null}
        </AuthForm>
      ) : null}
      {data?.social?.length ? <SocialAuth providers={data?.social} /> : null}
    </Fragment>
  );
};
