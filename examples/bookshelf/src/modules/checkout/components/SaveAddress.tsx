'use client';

import { useFormValues } from 'react-shop';
import { BooleanInput } from 'react-shop-mui/BooleanInput';

const SaveAddress = () => {
  const formValues = useFormValues();

  return (
    <BooleanInput
      disabled={Object.values(formValues.address)?.length === 0}
      source="_save_address"
      label="Save address as default"
    />
  );
};

export default SaveAddress;
