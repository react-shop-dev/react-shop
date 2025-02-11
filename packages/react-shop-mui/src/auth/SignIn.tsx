import { SetStateAction, Fragment } from 'react';
import { required, useTranslate, email, useSignIn, AuthProvidersData } from 'react-shop';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
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

  const hasCredentails = data?.redirectable?.length;

  return (
    <Fragment>
      {hasCredentails ? (
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
      {data?.social?.length ? (
        <Fragment>
          {hasCredentails ? (
            <Divider sx={{ py: 2 }}>
              <Typography variant="caption">or Sign In with</Typography>
            </Divider>
          ) : null}
          <SocialAuth providers={data?.social} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};
