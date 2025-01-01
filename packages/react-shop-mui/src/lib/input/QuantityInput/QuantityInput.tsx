'use client';
import { forwardRef } from 'react';
import { useCartProvider } from 'react-shop';
import type { Identifier } from 'react-shop-types';
import { NumberSpinner, type NumberSpinnerProps } from '../NumberSpinner';

export interface QuantityInputProps extends Omit<NumberSpinnerProps, 'id'> {
  id: Identifier;
  value: number;
  inStock?: number;
}

export const QuantityInput = forwardRef((props: QuantityInputProps, ref) => {
  const { id, value, inStock, ...rest } = props;

  const { updateItem, isFetching } = useCartProvider();

  return (
    <NumberSpinner
      ref={ref}
      value={value}
      disabled={isFetching}
      onChange={inputValue => {
        if (inputValue !== value) {
          updateItem({ lineId: id, quantity: inputValue });
        }
      }}
      {...(inStock ? { max: Number(inStock) } : {})}
      {...rest}
    />
  );
});

QuantityInput.displayName = 'QuantityInput';
