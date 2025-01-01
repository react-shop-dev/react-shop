'use client';

import { FieldTitle, useInput } from 'react-shop';
import clsx from 'clsx';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { InputHelperText } from '../InputHelperText';
import type { CommonInputProps } from '../TextInput';
import { sanitizeInputRestProps } from '../sanitizeInputRestProps';

export const TimeInput = (props: TimeInputProps) => {
  const {
    source,
    defaultValue,
    onChange,
    onBlur,
    format = formatTime,
    parse = parseTime,
    disabled,
    readOnly,
    label,
    helperText,
    margin,
    className,
    variant,
    validate,
    ...rest
  } = props;

  const { id, field, fieldState, isRequired } = useInput({
    source,
    onChange,
    onBlur,
    defaultValue,
    format,
    parse,
    validate,
    disabled,
    readOnly,
  });

  const { error, invalid } = fieldState;

  const renderHelperText = helperText !== false || invalid;

  return (
    <TextField
      id={id}
      {...field}
      type="time"
      size="small"
      className={clsx(`rs-input-${source}`, className)}
      margin={margin}
      variant={variant}
      disabled={disabled || readOnly}
      readOnly={readOnly}
      error={invalid}
      label={<FieldTitle label={label} isRequired={isRequired} />}
      helperText={
        renderHelperText ? <InputHelperText error={error?.message} helperText={helperText} /> : null
      }
      InputLabelProps={defaultInputLabelProps}
      {...sanitizeInputRestProps(rest)}
    />
  );
};

const defaultInputLabelProps = { shrink: true };

export type TimeInputProps = CommonInputProps & Omit<TextFieldProps, 'helperText' | 'label'>;

const parseTime = (value: any) => {
  if (typeof value !== 'string') {
    return null;
  }
  const timeTokens = value.split(':').map(v => parseInt(v));
  const today = new Date();
  today.setHours(timeTokens[0] ?? 0);
  today.setMinutes(timeTokens[1] ?? 0);
  return today;
};

const leftPad =
  (nb = 2) =>
  (value: unknown) =>
    ('0'.repeat(nb) + value).slice(-nb);
const leftPad2 = leftPad(2);

const convertDateToString = (value: Date) => {
  if (!(value instanceof Date) || isNaN(value.getDate())) return '';
  const hh = leftPad2(value.getHours());
  const mm = leftPad2(value.getMinutes());
  return `${hh}:${mm}`;
};

const timeRegex = /^\d{2}:\d{2}$/;

const formatTime = (value: string | Date) => {
  if (value == null || value === '') {
    return '';
  }
  if (value instanceof Date) {
    return convertDateToString(value);
  }
  if (timeRegex.test(value)) {
    return value;
  }

  return convertDateToString(new Date(value));
};
