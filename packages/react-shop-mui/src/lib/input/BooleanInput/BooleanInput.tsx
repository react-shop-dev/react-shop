'use client';

import { ChangeEvent, useCallback } from 'react';
import { useInput, FieldTitle } from 'react-shop';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup, { type FormGroupProps } from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Switch, { type SwitchProps } from '@mui/material/Switch';
import { InputHelperText } from '../InputHelperText';
import { CommonInputProps } from '../TextInput';
import clsx from 'clsx';
import { sanitizeInputRestProps } from '../sanitizeInputRestProps';

export const BooleanInput = (props: BooleanInputProps) => {
  const {
    source,
    defaultValue = false,
    format,
    parse,
    onBlur,
    onChange,
    onFocus,
    validate,
    disabled,
    readOnly,
    helperText,
    label,
    className,
    row = false,
    sx,
    options = defaultOptions,
    ...rest
  } = props;

  const {
    id,
    field,
    isRequired,
    fieldState: { error, invalid },
  } = useInput({
    type: 'checkbox',
    source,
    defaultValue,
    format,
    parse,
    onBlur,
    onChange,
    validate,
    disabled,
    readOnly,
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      field.onChange(event);
      field.onBlur();
    },
    [field],
  );

  const renderHelperText = helperText !== false || invalid;

  return (
    <FormGroup row={row} sx={sx} className={clsx(`rs-input-${source}`, className)}>
      <FormControlLabel
        inputRef={field.ref}
        label={<FieldTitle isRequired={isRequired} label={label} />}
        control={
          <Switch
            id={id}
            name={field.name}
            onFocus={onFocus}
            onChange={handleChange}
            checked={Boolean(field.value)}
            {...sanitizeInputRestProps(rest)}
            {...options}
            disabled={disabled || readOnly}
            readOnly={readOnly}
          />
        }
      />
      {renderHelperText ? (
        <FormHelperText error={invalid}>
          <InputHelperText error={error?.message} helperText={helperText} />
        </FormHelperText>
      ) : null}
    </FormGroup>
  );
};

export type BooleanInputProps = CommonInputProps &
  Omit<SwitchProps, 'defaultValue'> &
  Omit<FormGroupProps, 'defaultValue' | 'onChange' | 'onBlur' | 'onFocus'> & {
    options?: SwitchProps;
  };

const defaultOptions = {};
