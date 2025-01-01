'use client';
import { useEffect, useState, useRef } from 'react';
import type { Product } from 'react-shop-types';
import get from 'lodash/get';
import type { AutocompleteValue } from '@mui/base/useAutocomplete';

export const useSelectedChoice = (
  value: any,
  { choices, optionValue }: any,
): AutocompleteValue<Product, false, false, false> => {
  const selectedChoiceRef = useRef(getSelectedItems(choices, value, optionValue));

  const [selectedChoice, setSelectedChoice] = useState(() =>
    getSelectedItems(choices, value, optionValue),
  );

  useEffect(() => {
    const newSelectedItems = getSelectedItems(choices, value, optionValue);
    if (!areSelectedItemEqual(selectedChoiceRef.current, newSelectedItems, optionValue)) {
      selectedChoiceRef.current = newSelectedItems;
      setSelectedChoice(newSelectedItems);
    }
  }, [choices, value, optionValue]);

  return selectedChoice || null;
};

const getSelectedItems = (choices = [], value: any, optionValue = 'id') =>
  choices.find(choice => String(get(choice, optionValue)) === String(value) || '');

const areSelectedItemEqual = (
  selectedChoice?: Product,
  newSelectedChoice?: Product,
  optionValue = 'id',
) => get(selectedChoice, optionValue) === get(newSelectedChoice, optionValue);
