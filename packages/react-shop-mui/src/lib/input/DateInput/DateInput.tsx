'use client';
import clsx from 'clsx';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FieldTitle, useInput } from 'react-shop';
import type { CommonInputProps } from '../TextInput';
import { InputHelperText } from '../InputHelperText';
import { sanitizeInputRestProps } from '../sanitizeInputRestProps';

export type DateInputProps = CommonInputProps & Omit<TextFieldProps, 'helperText' | 'label'>;

export const DateInput = (props: DateInputProps) => {
  const {
    className,
    name,
    source,
    defaultValue,
    validate,
    format = getStringFromDate,
    parse,
    onChange,
    onBlur,
    disabled,
    size = 'small',
    margin,
    variant,
    label,
    helperText,
    readOnly,
    slotProps,
    ...rest
  } = props;

  const { field, fieldState, id, isRequired } = useInput({
    defaultValue,
    name,
    source,
    validate,
    format,
    parse,
    onChange,
    onBlur,
    disabled,
    readOnly,
  });

  const { error, invalid } = fieldState;
  const renderHelperText = helperText !== false || invalid;

  return (
    <TextField
      id={id}
      {...field}
      className={clsx(`rs-input-${source}`, className)}
      type="date"
      size={size}
      error={invalid}
      margin={margin}
      variant={variant}
      disabled={disabled || readOnly}
      readOnly={readOnly}
      label={label ? <FieldTitle label={label} isRequired={isRequired} /> : null}
      helperText={
        renderHelperText ? <InputHelperText error={error?.message} helperText={helperText} /> : null
      }
      slotProps={{ inputLabel: defaultInputLabelProps, ...slotProps }}
      {...sanitizeInputRestProps(rest)}
    />
  );
};

const convertDateToString = (value: Date) => {
  if (!(value instanceof Date) || isNaN(value.getDate())) {
    return '';
  }
  const pad = '00';
  const yyyy = value.getFullYear().toString();
  const MM = (value.getMonth() + 1).toString();
  const dd = value.getDate().toString();
  return `${yyyy}-${(pad + MM).slice(-2)}-${(pad + dd).slice(-2)}`;
};

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const defaultInputLabelProps = { shrink: true };

const getStringFromDate = (value: string | Date) => {
  if (value == null || value === '') {
    return '';
  }

  if (value instanceof Date) {
    return convertDateToString(value);
  }

  if (dateRegex.test(value)) {
    return value;
  }

  return convertDateToString(new Date(value));
};
