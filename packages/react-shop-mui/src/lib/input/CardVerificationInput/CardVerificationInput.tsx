'use client';
import { useInput, regex, useNumberInput, FieldTitle } from 'react-shop';
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField';
import type { CommonInputProps } from '../TextInput';
import { InputHelperText } from '../InputHelperText';
import { TextField } from '../../field/TextField';

export type CardVerificationInputProps = CommonInputProps &
  TextFieldProps & {
    maxLength?: number;
    viewMode?: boolean;
    placeholder?: string;
  };

export const CardVerificationInput = (props: CardVerificationInputProps) => {
  const {
    source,
    validate = defaultValidator,
    defaultValue,
    helperText,
    label = 'CVC',
    disabled,
    maxLength = 3,
    viewMode,
    placeholder = 'CVC',
    ...rest
  } = props;

  const {
    id,
    field,
    field: { onChange },
    fieldState: { error, invalid },
    isRequired,
  } = useInput({ source, validate, defaultValue });

  const { inputRef, getInputProps } = useNumberInput({ min: 0, max: 999, onChange });

  if (viewMode) {
    return <TextField value={placeholder} />;
  }

  const renderHelperText = helperText !== false && invalid;

  return (
    <MuiTextField
      id={id}
      type="password"
      inputRef={inputRef}
      label={label ? <FieldTitle label={label} isRequired={isRequired} /> : null}
      helperText={
        renderHelperText ? <InputHelperText error={error?.message} helperText={helperText} /> : null
      }
      disabled={disabled}
      error={invalid}
      {...field}
      slotProps={{
        htmlInput: {
          size: maxLength,
          maxLength,
          ...getInputProps(props),
          value: field.value,
        },
      }}
      {...rest}
    />
  );
};

const defaultValidator = regex(/^\d{3,4}$/, 'Must be a valid CVC Code');
