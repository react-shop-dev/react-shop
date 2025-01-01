'use client';

import { useMemo } from 'react';
import { useShipping, required, useCartProvider } from 'react-shop';
import { RadioButtonGroupInput } from 'react-shop-mui/RadioButtonGroupInput';
import { styled } from '@mui/material/styles';
import { InputHolder } from '../../common/InputHolder';
import { CheckoutFormToolbar } from '../components/CheckoutFormToolbar';
import DeliveryItem from '../components/DeliveryItem';
import CheckoutFormLayout, { type CheckoutFormElementProps } from './CheckoutFormLayout';

const Delivery = ({ title = 'rs.checkout.delivery', step, ...rest }: CheckoutFormElementProps) => {
  const { cart: { shipping_methods } = {} } = useCartProvider();
  const { data: shippingOptions, setShipping } = useShipping();

  const defaultValue = shipping_methods?.[0]?.shipping_option_id;

  const choices = useMemo(
    () => shippingOptions?.filter(option => !option.is_return),
    [shippingOptions],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof setShipping === 'function') {
      setShipping((event.target as HTMLInputElement).value);
    }
  };

  return (
    <CheckoutFormLayout toolbar={<CheckoutFormToolbar title={title} step={step} />} {...rest}>
      <InputHolder gridColumn={12}>
        <StyledRadioButtonGroup
          label="Shipping method"
          source="shipping_method_id"
          row={false}
          choices={choices}
          onChange={handleChange}
          validate={required()}
          optionText={DeliveryItem}
          defaultValue={defaultValue}
        />
      </InputHolder>
    </CheckoutFormLayout>
  );
};

const StyledRadioButtonGroup = styled(RadioButtonGroupInput)(({ theme }) => ({
  '& .MuiFormControlLabel-root': {
    border: `1px solid ${theme.palette.grey[300]}`,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
  '& .MuiFormControlLabel-label': {
    width: '100%',
  },
}));

export default Delivery;
