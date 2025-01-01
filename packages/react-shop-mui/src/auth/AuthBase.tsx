import {
  ReactElement,
  ComponentType,
  createElement,
  isValidElement,
  cloneElement,
  ReactNode,
} from 'react';
import { useIdentityProviders } from 'react-shop';
import { SignIn as DefaultSignIn } from './SignIn';
import { SignUp as DefaultSignUp } from './SignUp';
import { ForgotPassword as DefaultForgotPassword } from './ForgotPassword';
import { AuthView } from './AuthView';

export const AuthBase = (props: AuthBaseProps) => {
  const {
    signInForm = DefaultSignIn,
    signUpForm = DefaultSignUp,
    fogotPasswordForm = DefaultForgotPassword,
    allowForgot = true,
    allowSignup = true,
    hasPasswordAuth = true,
    debounceQuery = 1000,
    requiredUsername,
    ...rest
  } = props;

  const { data, isPending } = useIdentityProviders({
    debounce: debounceQuery,
  });

  const hasCredentails = data?.providers && Object.keys(data?.providers).includes('credentials');

  return (
    <AuthView
      isLoading={isPending}
      signIn={props =>
        createOrCloneElement(signInForm, {
          hasPasswordAuth: hasPasswordAuth && hasCredentails,
          allowForgot,
          data,
          ...props,
        })
      }
      signUp={() =>
        allowSignup && hasCredentails
          ? createOrCloneElement(signUpForm, {
              requiredUsername,
            })
          : null
      }
      forgotPassword={allowForgot ? createOrCloneElement(fogotPasswordForm) : null}
      {...rest}
    />
  );
};

export interface AuthBaseProps {
  signInForm?: ReactElement | ComponentType;
  signUpForm?: ReactElement | ComponentType;
  fogotPasswordForm?: ReactElement | ComponentType;
  allowSignup?: boolean;
  allowForgot?: boolean;
  hasPasswordAuth?: boolean;
  requiredUsername?: boolean;
  signInTitle?: string;
  signUpTitle?: string;
  debounceQuery?: number;
}

const createOrCloneElement = (element: any, props?: any, children?: ReactNode) =>
  isValidElement(element)
    ? cloneElement(element, props, children)
    : createElement(element, props, children);
