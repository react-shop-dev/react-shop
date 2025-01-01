import { ReactNode, useState } from 'react';
import { Form, type FormProps } from 'react-shop';
import isObject from 'lodash/isObject';
import type { SxProps } from '@mui/material/styles';
import { AuthFeedback } from '../AuthFeedback';
import { FlexBox } from '@views/FlexBox';
import { SubmitButton } from '@button/SubmitButton';

export const AuthForm = (props: AuthFormProps) => {
  const {
    submit,
    onSuccessAction,
    onErrorAction,
    buttonText = 'Submit',
    children,
    ...rest
  } = props;

  const [authError, setAuthError] = useState<Error | undefined>(undefined);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (values: any) => {
    try {
      const response = await submit(values);
      if (isObject(response) && response.message) {
        setMessage(response.message);
      }
      if (typeof onSuccessAction === 'function') {
        onSuccessAction(values, response);
      }
    } catch (error) {
      if (typeof onErrorAction === 'function') {
        onErrorAction(error);
      }
      setAuthError(error as Error);
    }
  };

  const renderFeedback = () =>
    message ? (
      <AuthFeedback severity="success" message={message} />
    ) : authError ? (
      <AuthFeedback severity="error" message={authError.message || 'Authentication failed'} />
    ) : null;

  return (
    <Form noValidate onSubmit={onSubmit} {...rest}>
      {children}
      <FlexBox flexDirection="column" gap={2} sx={{ pt: 2 }}>
        <SubmitButton fullWidth label={buttonText} />
        {renderFeedback()}
      </FlexBox>
    </Form>
  );
};

export type AuthFormProps = FormProps & {
  children: ReactNode;
  isValid?: boolean;
  buttonText?: string;
  onSuccessAction?: SuccessAction;
  onErrorAction?: (error: unknown) => void;
  defaultValues?: any;
  resetAfterSubmit?: boolean;
  sx?: SxProps;
  submit: (data: any) => Promise<Response | string | void> | undefined;
};

type Response = { message: string };

export type SuccessAction = (event: any, response?: any) => void;
