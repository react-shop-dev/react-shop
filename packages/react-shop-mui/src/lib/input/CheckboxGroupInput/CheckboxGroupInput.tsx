'use client';
import { useCallback, BaseSyntheticEvent } from 'react';
import { useInput, ChoicesProps, FieldTitle } from 'react-shop';
import get from 'lodash/get';
import FormLabel from '@mui/material/FormLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import type { CheckboxProps } from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import { CheckboxGroupInputItem } from '../CheckboxGroupInputItem';
import type { CommonInputProps } from '../TextInput';
import { InputHelperText } from '../InputHelperText';
import { sanitizeInputRestProps } from '../sanitizeInputRestProps';

export type CheckboxGroupInputProps = CommonInputProps &
  ChoicesProps &
  FormControlProps & {
    row?: boolean;
    options?: CheckboxProps;
    group?: boolean;
  };

export const CheckboxGroupInput = (props: CheckboxGroupInputProps) => {
  const {
    source,
    format,
    parse,
    onChange,
    onBlur,
    label,
    options,
    choices,
    helperText,
    disabled,
    row = false,
    margin,
    className,
    optionText = 'name',
    optionValue = 'id',
    translateChoice,
    validate,
    group = true,
    readOnly,
    ...rest
  } = props;

  const {
    id,
    field: { value, onBlur: formOnBlur, onChange: formOnChange },
    fieldState: { error, invalid },
    isRequired,
  } = useInput({ source, format, parse, onChange, onBlur, validate, disabled, readOnly });

  const handleCheck = useCallback(
    (event: BaseSyntheticEvent, isChecked: boolean) => {
      let newValue: any;

      if (choices?.every(item => typeof get(item, optionValue) === 'number')) {
        try {
          newValue = JSON.parse(event.target.value);
        } catch (e) {
          newValue = event.target.value;
        }
      } else {
        newValue = event.target.value;
      }

      if (isChecked) {
        formOnChange(group ? [...(value || []), ...[newValue]] : newValue);
      } else {
        formOnChange(group ? value.filter((val: unknown) => val !== newValue) : '');
      }
      formOnBlur();
    },
    [choices, formOnChange, formOnBlur, optionValue, value, group],
  );

  const renderHelperText = helperText !== false || invalid;

  return (
    <FormControl component="fieldset" margin={margin} error={invalid}>
      {label ? (
        <FormLabel component="legend">
          <FieldTitle label={label} isRequired={isRequired} />
        </FormLabel>
      ) : null}
      <FormLabel component="legend">
        <FieldTitle label={label} isRequired={isRequired} />
      </FormLabel>
      <FormGroup row={row}>
        {choices?.map(choice => (
          <CheckboxGroupInputItem
            key={get(choice, optionValue)}
            id={id}
            className={className}
            choice={choice}
            value={value}
            optionText={optionText}
            optionValue={optionValue}
            options={options}
            translateChoice={translateChoice}
            onChange={handleCheck}
            disabled={disabled || readOnly}
            readOnly={readOnly}
            {...sanitizeInputRestProps(rest)}
          />
        ))}
      </FormGroup>
      {renderHelperText ? (
        <FormHelperText>
          <InputHelperText helperText={helperText} error={error?.message} />
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};
