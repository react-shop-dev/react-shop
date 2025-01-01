import type { ReactNode } from 'react';
import { Form, FormProps } from 'react-shop';
import { SubmitButton } from 'react-shop-mui/SubmitButton';

export const AddReviewForm = ({ children, ...rest }: { children: ReactNode } & FormProps) => {
  return (
    <Form record={{}} defaultValues={{ comment: '', rating: null }} resetAfterSubmit {...rest}>
      {children}
      <SubmitButton label="Submit" />
    </Form>
  );
};
