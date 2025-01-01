'use client';

import { MouseEvent } from 'react';
import {
  Form,
  FormDataConsumer,
  minLength,
  required,
  useNotify,
  useRedirect,
  useShowContext,
  useUpdate,
} from 'react-shop';
import { Dialog, type DialogProps } from 'react-shop-mui/Dialog';
import { SelectInput } from 'react-shop-mui/SelectInput';
import { TextInput } from 'react-shop-mui/TextInput';
import type { Address, Customer } from 'react-shop-types';
import mockCountries from '@/lib/mocks/countries';
import { InputHolder } from '@/modules/common/InputHolder';
import { PhoneInput } from '@/modules/common/PhoneInput';
import { StyledFormLayout } from '@/modules/layout/FormLayout.styles';
import { v4 as uuidv4 } from 'uuid';

export const AddressModal = ({
  id: addressId,
  onClose,
  ...rest
}: { id?: string; onClose?: (event?: MouseEvent<Element, any>) => void } & Omit<
  DialogProps,
  'open' | 'onClose'
>) => {
  const redirect = useRedirect();
  const { record: customer, resource } = useShowContext<Customer>();

  const [update, { isPending }] = useUpdate();
  const notify = useNotify();

  const editAddress = addressId
    ? customer?.shipping_addresses?.find(address => address.id === addressId)
    : null;

  const handleClose = (event?: MouseEvent<Element, any>) => {
    if (typeof onClose === 'function') {
      onClose(event);
      return;
    }
    redirect({});
  };

  const handleSubmit = (formData: Record<string, any>) => {
    const addressData: Address = editAddress
      ? { ...editAddress, ...formData }
      : {
          ...formData,
          id: uuidv4(),
          customer_id: customer?.id,
          created_at: new Date(),
        };
    const shipping_addresses = [
      ...(Array.isArray(customer?.shipping_addresses)
        ? customer.shipping_addresses.filter(address => address.id !== addressId)
        : []),
      addressData,
    ];
    update(
      resource,
      {
        id: customer?.id,
        previousData: customer,
        data: {
          shipping_addresses,
        },
      },
      {
        onSuccess() {
          notify('Address Book updated', { type: 'success' });
          handleClose();
        },
        onError() {
          notify('Cannot update Address Book', { type: 'error' });
        },
      },
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      {...(editAddress
        ? {
            defaultValues: {
              ...editAddress,
              country_code: editAddress.country_code?.toLowerCase(),
            },
          }
        : {})}
    >
      <Dialog
        onClose={handleClose}
        {...rest}
        open
        confirmText="Save"
        ConfirmButtonProps={{ type: 'submit' }}
        isLoading={isPending}
        sx={{
          '& .MuiDialogActions-root': {
            px: 3,
          },
        }}
      >
        <StyledFormLayout>
          <InputHolder gridColumn={6}>
            <TextInput
              source="first_name"
              label="rs.field.firstName"
              validate={[required(), minLength(2)]}
            />
          </InputHolder>
          <InputHolder gridColumn={6}>
            <TextInput
              source="last_name"
              label="rs.field.lastName"
              validate={[required(), minLength(2)]}
            />
          </InputHolder>
          <InputHolder gridColumn={6}>
            <SelectInput
              optionValue="code"
              source="country_code"
              choices={mockCountries}
              label="rs.field.country"
              validate={required()}
            />
          </InputHolder>
          <InputHolder gridColumn={6}>
            <FormDataConsumer>
              {({ formData }) => (
                <PhoneInput
                  source="phone"
                  label="rs.field.phone"
                  country={formData?.country_code}
                />
              )}
            </FormDataConsumer>
          </InputHolder>
          <InputHolder gridColumn={3}>
            <TextInput source="postal_code" label="rs.field.postalCode" />
          </InputHolder>
          <InputHolder gridColumn={9}>
            <TextInput source="city" label="rs.field.city" validate={required()} />
          </InputHolder>
          <InputHolder gridColumn={6}>
            <TextInput source="company" label="rs.field.company" />
          </InputHolder>
          <InputHolder gridColumn={6}>
            <TextInput source="province" label="Province" />
          </InputHolder>
          <InputHolder>
            <TextInput source="address_1" label="rs.field.address" validate={required()} />
          </InputHolder>
          <InputHolder>
            <TextInput source="address_2" label="Address 2" />
          </InputHolder>
        </StyledFormLayout>
      </Dialog>
    </Form>
  );
};
