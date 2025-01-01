'use client';
import { useState, ChangeEvent, forwardRef, KeyboardEvent, useEffect } from 'react';
import { useInput, useSeparatorInput, regex, FieldTitle, useResetField } from 'react-shop';
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField';
import type { CommonInputProps } from '../TextInput';
import { InputHelperText } from '../InputHelperText';
import { TextField } from '../../field/TextField';

export type CardINumberInputProps = CommonInputProps &
  TextFieldProps & {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    separator?: string;
    maxLength?: Array<number>;
    viewMode?: boolean;
  };

export const CardNumberInput = forwardRef<HTMLInputElement, CardINumberInputProps>((props, ref) => {
  const {
    source,
    defaultValue = null,
    validate = defaultValidator,
    margin,
    format = chunkValue,
    parse = removeSeparator,
    helperText,
    separator = ' ',
    maxLength = [4, 4, 4, 4],
    onChange,
    className,
    label,
    disabled,
    onKeyDown,
    variant,
    inputProps = defaultInputProps,
    viewMode = false,
    ...rest
  } = props;

  const resetField = useResetField();

  const {
    id,
    field,
    fieldState: { error, invalid },
    isRequired,
  } = useInput({
    source,
    validate,
    defaultValue,
  });

  const { addSeparator, onKeyDownHandler } = useSeparatorInput({ maxLength, separator });

  const [value, setValue] = useState(format(String(field.value), 4, separator));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
    const newValue = addSeparator(event);
    setValue(newValue);
    field.onChange(parse(newValue, separator));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
    onKeyDownHandler(event);
  };

  useEffect(() => {
    resetField(source, { defaultValue: removeDashAndSpaces(field.value) });
  }, []);

  if (viewMode) {
    return <TextField sx={{ minWidth: '20ch' }} value={maskCardNumber(value, maxLength[0])} />;
  }

  const renderHelperText = helperText !== false && invalid;

  return (
    <MuiTextField
      id={id}
      inputRef={ref}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      margin={margin}
      disabled={disabled}
      className={className}
      variant={variant}
      error={invalid}
      label={label ? <FieldTitle label={label} isRequired={isRequired} /> : null}
      helperText={
        renderHelperText ? <InputHelperText error={error?.message} helperText={helperText} /> : null
      }
      inputProps={inputProps}
      {...rest}
    />
  );
});

CardNumberInput.displayName = 'CardINumberInput';

const pattern =
  '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35d{3})d{11})$';

const defaultInputProps = { type: 'tel', size: 19, pattern };

const chunkValue = (value: string, n: number, separator: string) => {
  let result = '';
  Array.from(removeDashAndSpaces(value)).forEach((char, index) => {
    result = `${result}${char}`;
    if (index % n === 3) {
      result += separator;
    }
  });
  return result.trim();
};

const maskCardNumber = (value: string, chunk: number) => {
  const digits = value.split('');
  const maskedDigits = digits.map((digit, index) => (index >= chunk ? '*' : digit));
  const maskedCardNumber = maskedDigits.join('').replace(/(.{4})/g, '$1 ');
  return maskedCardNumber.trim();
};

const removeDashAndSpaces = (inputString: string) => inputString.replace(/[-\s]/g, '');

const removeSeparator = (value: string, cardSeparator: string) =>
  value.replace(new RegExp(cardSeparator, 'g'), '').trim();

const defaultValidator = regex(/\d{16}/, 'Must be a valid Card Number');
