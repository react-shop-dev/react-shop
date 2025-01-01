'use client';
import { BaseSyntheticEvent } from 'react';
import { ChoicesProps, useChoices } from 'react-shop';
import MuiCheckbox, { type CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import type { CommonInputProps } from '../TextInput';

export type CheckboxGroupInputItemProps = Omit<CommonInputProps, 'source'> &
  ChoicesProps & {
    choice: any;
    value: any[];
    className?: string;
    options?: CheckboxProps;
    onChange?: (event: BaseSyntheticEvent, isChecked: boolean) => void;
  };

export const CheckboxGroupInputItem = (props: CheckboxGroupInputItemProps) => {
  const { id, value, choice, optionValue, translateChoice, className, options, onChange } = props;

  const { getChoiceText, getChoiceValue } = useChoices({ optionValue, translateChoice });

  const nodeValue = getChoiceValue(choice);
  const nodeId = `${id}_${nodeValue}`;
  const choiseName = getChoiceText(choice);

  const isChecked = Array.isArray(value)
    ? value.find(val => val == nodeValue) !== undefined
    : String(value) === String(nodeValue);

  return (
    <FormControlLabel
      htmlFor={nodeId}
      label={choiseName}
      className={className}
      onChange={onChange}
      control={
        <MuiCheckbox
          id={nodeId}
          color="primary"
          value={String(nodeValue)}
          checked={isChecked}
          {...options}
        />
      }
    />
  );
};
