'use client';

import { Form, ArrayInput, useEditController } from 'react-shop';
import { CardNumberInput } from 'react-shop-mui/CardNumberInput';
import { CardVerificationInput } from 'react-shop-mui/CardVerificationInput';
import { ExpiryInput } from 'react-shop-mui/ExpiryInput';
import { FormIterator } from 'react-shop-mui/FormIterator';
import type { CardPayment, Customer } from 'react-shop-types';
import { STORAGE_USER_PREFIX } from '@/lib/constants';
import { demoUserCheck } from '@/lib/customer/getCustomerFromDB';
import { IteratorWrapper } from '../components/IteratorWrapper';
import { PaymentMethodImage } from '../components/PaymentMethodImage';
import { UserNameField } from '../components/UserNameField';
import { PaymentsPlaceholder } from '../skeletons/PaymentsPlaceholder';

export type PaymentFormProps = { id?: string; email: string };

const PaymentForm = ({ id, email }: PaymentFormProps) => {
  const isDemoUser = demoUserCheck(email);

  const { record, error, isPending, save } = useEditController<Customer>({
    id,
    resource: isDemoUser ? 'customers' : STORAGE_USER_PREFIX,
  });

  if (isPending === true) {
    return <PaymentsPlaceholder />;
  }

  if (error) {
    return null;
  }

  const handleSubmit = (values: Partial<Customer>) => {
    typeof save === 'function' ? save(values, {}) : undefined;
  };

  const customer = {
    ...record,
    payments: record?.payments?.map((payment: CardPayment) => ({
      ...payment,
      user_name: record.name,
    })),
  };

  return (
    <Form record={customer} noValidate onSubmit={handleSubmit} warnWhenUnsavedChanges>
      <ArrayInput source="payments">
        <FormIterator
          setViewMode={true}
          iteratorItemWrapper={IteratorWrapper}
          disableRemove={customer?.payments?.length === 1}
        >
          <PaymentMethodImage source="card_number" />
          <UserNameField label="Name" source="user_name" />
          <CardNumberInput label="Card Number" source="card_number" />
          <ExpiryInput label="Expire At" source="expire_at" />
          <CardVerificationInput source="cvc" />
        </FormIterator>
      </ArrayInput>
    </Form>
  );
};

export default PaymentForm;
