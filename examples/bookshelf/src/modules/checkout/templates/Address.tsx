'use client';

import { useMemo } from 'react';
import { FormDataConsumer, email, required, minLength, useRegion } from 'react-shop';
import { SelectInput } from 'react-shop-mui/SelectInput';
import { getCountryCodes } from 'react-shop/functions';
import mockCountries from '@/lib/mocks/countries';
import { PhoneInput } from '@/modules/common/PhoneInput';
import { InputHolder } from '../../common/InputHolder';
import { CheckoutFormToolbar } from '../components/CheckoutFormToolbar';
import { CheckoutInput } from '../components/CheckoutInput';
import SaveAddress from '../components/SaveAddress';
import CheckoutFormLayout, { type CheckoutFormElementProps } from './CheckoutFormLayout';

export type AddressProps = CheckoutFormElementProps & {
  country?: string;
  city?: string;
  hasAccount?: boolean;
};

const Address = ({
  title = 'rs.checkout.shipping',
  hasAccount,
  country,
  city,
  step,
  ...rest
}: AddressProps) => {
  const region = useRegion();

  const countries = getCountryCodes(region);

  const choices = useMemo(
    () => mockCountries.filter(country => countries?.includes(country.code)),
    [countries],
  );

  const defaultCountry =
    country && countries?.includes(country) ? country?.toLowerCase() : undefined;

  return (
    <CheckoutFormLayout toolbar={<CheckoutFormToolbar title={title} step={step} />} {...rest}>
      <CheckoutInput
        gridColumn={6}
        source="first_name"
        label="rs.field.firstName"
        validate={[required(), minLength(2)]}
      />
      <CheckoutInput
        gridColumn={6}
        source="last_name"
        label="rs.field.lastName"
        validate={[required(), minLength(2)]}
      />
      <InputHolder gridColumn={6}>
        <SelectInput
          optionValue="code"
          source="address.country_code"
          label="rs.field.country"
          choices={choices}
          validate={required()}
          autoComplete="country"
          defaultValue={defaultCountry}
        />
      </InputHolder>
      <CheckoutInput
        source="address.city"
        label="rs.field.city"
        autoComplete="address-level2"
        validate={required()}
        gridColumn={6}
        defaultValue={defaultCountry ? city : undefined}
      />
      <CheckoutInput
        gridColumn={6}
        source="email"
        label="rs.field.email"
        validate={[required(), email()]}
      />
      <InputHolder gridColumn={6}>
        <FormDataConsumer>
          {({ formData }) => (
            <PhoneInput
              source="phone"
              country={formData?.address?.country_code}
              label="rs.field.phone"
            />
          )}
        </FormDataConsumer>
      </InputHolder>
      <CheckoutInput source="address.postal_code" label="rs.field.postalCode" gridColumn={3} />
      <CheckoutInput
        gridColumn={9}
        source="address.address_1"
        label="rs.field.address"
        autoComplete="address-line1"
        validate={required()}
      />
      {hasAccount ? (
        <InputHolder gridColumn={12}>
          <SaveAddress />
        </InputHolder>
      ) : null}
    </CheckoutFormLayout>
  );
};

export default Address;
