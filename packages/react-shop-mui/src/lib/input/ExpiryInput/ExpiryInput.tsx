'use client';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useInput, useSeparatorInput, regex, FieldTitle } from 'react-shop';
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField';
import type { CommonInputProps } from '../TextInput';
import { InputHelperText } from '../InputHelperText';
import { TextField } from '../../field/TextField';

export type ExpiryInputProps = CommonInputProps &
  TextFieldProps & {
    fullYear?: boolean;
    defaultValue?: ExpiryValue;
    separator?: string;
    viewMode?: boolean;
    maxLength?: Array<number>;
  };

export const ExpiryInput = (props: ExpiryInputProps) => {
  const {
    source,
    inputProps,
    validate = defaultValidator,
    defaultValue,
    fullYear = false,
    maxLength = [2, fullYear ? 4 : 2],
    format = formatValue,
    parse = defaultParser,
    helperText,
    label,
    onChange,
    onKeyDown,
    separator = '/',
    viewMode,
    ...rest
  } = props;

  const {
    id,
    field,
    fieldState: { error, invalid },
    isRequired,
  } = useInput({ source, validate, defaultValue });

  const { addSeparator, onKeyDownHandler } = useSeparatorInput({
    maxLength,
    separator,
  });

  const [value, setValue] = useState(format(field.value, fullYear));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
    const inputValue = event.target.value;
    if (
      inputValue.length === 2 &&
      inputValue[1] === '/' &&
      Number.isInteger(Number(inputValue[0]))
    ) {
      setValue(`0${inputValue}`);
    } else {
      const newValue = addSeparator(event);
      setValue(newValue);
      field.onChange(parse(newValue));
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
    onKeyDownHandler(event);
  };

  if (viewMode) {
    return <TextField value={value} />;
  }

  const renderHelperText = helperText !== false && invalid;

  return (
    <MuiTextField
      id={id}
      value={value}
      error={invalid}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      label={label ? <FieldTitle label={label} isRequired={isRequired} /> : null}
      helperText={
        renderHelperText ? <InputHelperText error={error?.message} helperText={helperText} /> : null
      }
      slotProps={{
        htmlInput: {
          size: fullYear ? 7 : 5,
          placeholder: fullYear ? 'MM/YYYY' : 'MM/YY',
          ...inputProps,
        },
      }}
      {...rest}
    />
  );
};

const defaultParser = (value: string) => {
  const [month, year] = value.split('/');
  const { expMonth, expYear } = cardTimeInterval(month, year);

  return {
    expMonth: expMonth || null,
    expYear: expYear || null,
  };
};

export interface ExpiryValue {
  expMonth?: number;
  expYear?: number;
}

const formatValue = (value: ExpiryValue, fullYear: boolean) =>
  value.expMonth
    ? `${prependZero(value.expMonth)}/${fullYear ? value.expYear : String(value.expYear).slice(-2)}`
    : '';

const prependZero = (value: number | undefined) => {
  if (!value) return '';
  return value.toString().length === 1 ? `0${value}` : value;
};

const cardTimeInterval = (monthValue: string, year: string) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const month = parseInt(monthValue, 10);
  let inputYear = parseInt(year, 10);

  if (year.length === 2) {
    // Determine the threshold for interpreting two-digit years
    const threshold = 30;
    const currentCentury = Math.floor(currentYear / 100);
    // Convert two-digit year to four-digit year based on the threshold
    inputYear = currentCentury + (inputYear < threshold ? inputYear + 100 : inputYear);
  }
  // Check if the input month is not greater than 12
  if (month <= 12) {
    // If the input year is in the future
    if (inputYear > currentYear || (inputYear === currentYear && month >= currentMonth)) {
      return { expMonth: month, expYear: inputYear }; // Return the provided month and year
    } else {
      // If the input year is in the past or the current month
      return { expMonth: currentMonth, expYear: currentYear }; // Return the current month and year
    }
  } else {
    // If the input month is greater than 12, return error or handle as needed
    return { expMonth: 12, expYear: inputYear };
  }
};

const defaultValidator = regex(/^(0[1-9]|1[0-2])\/(2[0-9]{3}|[0-9]{2})$/, 'Must be a valid value');
