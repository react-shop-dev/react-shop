'use client';

import type { PropsWithChildren } from 'react';
import { EditBase, Form } from 'react-shop';
import type { SignInUser } from 'react-shop-auth';
import { SubmitButton } from 'react-shop-mui/SubmitButton';
import type { Customer } from 'react-shop-types';
import { STORAGE_USER_PREFIX } from '@/lib/constants';
import { demoUserCheck } from '@/lib/customer/getCustomerFromDB';
import { checkPasswordMatch } from '../../../lib/auth/actions/checkPasswordMatch';
import { DeleteAccountButton } from '../components/DeleteAccountButton';
import { StyledFormStack } from '../components/StyledFormStack';

const ProfileForm = ({ user, children }: PropsWithChildren & { user: SignInUser }) => {
  const transform = (data: Partial<Customer>) => ({
    ...data,
    user_email: undefined,
    name: `${data.first_name} ${data.last_name}`,
  });

  const isDemoUser = demoUserCheck(user.email);

  return (
    <EditBase<Customer>
      id={user.id}
      resource={isDemoUser ? 'customers' : STORAGE_USER_PREFIX}
      transform={transform}
      redirect={{ query: {} }}
    >
      <Form
        mode="onSubmit"
        validate={validateForm}
        defaultValues={{
          user_email: user.email,
          first_name: user?.first_name ?? user?.name?.split(' ')[0],
          last_name: user?.last_name ?? user?.name?.split(' ')[1],
        }}
      >
        {children}
        <StyledFormStack gap={2} justifyContent={isDemoUser ? 'flex-end' : 'space-between'}>
          {!isDemoUser ? <DeleteAccountButton /> : null}
          <SubmitButton />
        </StyledFormStack>
      </Form>
    </EditBase>
  );
};

const validateForm = async (values: Record<string, any>): Promise<Record<string, any>> => {
  const errors = {} as any;
  if (!values.first_name) {
    errors.first_name = 'rs.validation.required';
  }
  if (!values.last_name) {
    errors.last_name = 'rs.validation.required';
  }
  if (values.new_password) {
    if (values.old_password === values.new_password) {
      errors.new_password = 'The new password should not be the same as the old password';
    } else {
      const isPasswordMatch = await checkPasswordMatch(values.email, values.old_password);
      if (!isPasswordMatch) {
        errors.old_password = 'The current password you entered is incorrect.';
      }
    }
  }
  return errors;
};

export default ProfileForm;
