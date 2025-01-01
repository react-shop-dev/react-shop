'use client';
import { ChoicesProps, FieldTitle, useInput } from 'react-shop';
import get from 'lodash/get';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import RadioGroup, { type RadioGroupProps } from '@mui/material/RadioGroup';
import FormControl, { type FormControlProps } from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { RadioButtonGroupInputItem } from '../RadioButtonGroupInputItem/RadioButtonGroupInputItem';
import { InputHelperText } from '../InputHelperText';
import type { CommonInputProps } from '../TextInput';

export type RadioButtonGroupInputProps = CommonInputProps &
  ChoicesProps &
  FormControlProps &
  RadioGroupProps & {
    options?: RadioGroupProps;
  };

export const RadioButtonGroupInput = (props: RadioButtonGroupInputProps) => {
  const {
    className,
    margin = 'dense',
    row = true,
    helperText,
    source,
    label,
    disabled,
    validate,
    format,
    parse,
    onChange,
    onBlur,
    choices,
    optionText = 'name',
    optionValue = 'id',
    translateChoice,
    options = defaultOptions,
    readOnly,
    ...rest
  } = props;

  const { id, isRequired, fieldState, field } = useInput({
    source,
    validate,
    disabled,
    format,
    parse,
    onChange,
    onBlur,
    readOnly,
    ...rest,
  });

  const { error, invalid } = fieldState;

  const renderHelperText = helperText !== false || invalid;

  return (
    <StyledFormControl
      component="fieldset"
      className={clsx(`rs-input-${source}`, className)}
      margin={margin}
      error={invalid}
      disabled={disabled || readOnly}
    >
      {label ? (
        <FormLabel component="legend" className={RadioButtonInputClasses.label}>
          <FieldTitle label={label} isRequired={isRequired} />
        </FormLabel>
      ) : null}
      <RadioGroup id={id} row={row} {...field} {...options}>
        {choices?.map((choice: any) => (
          <RadioButtonGroupInputItem
            key={get(choice, optionValue)}
            choice={choice}
            source={id}
            optionText={optionText}
            optionValue={optionValue}
            translateChoice={translateChoice}
          />
        ))}
      </RadioGroup>
      {renderHelperText ? (
        <FormHelperText>
          <InputHelperText error={error?.message} helperText={helperText} />
        </FormHelperText>
      ) : null}
    </StyledFormControl>
  );
};

const PREFIX = 'ShopRadioButtonGroupInput';

export const RadioButtonInputClasses = {
  label: `${PREFIX}-label`,
};

const StyledFormControl = styled(FormControl, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})<{ component?: string }>({
  [`& .${RadioButtonInputClasses.label}`]: {},
});

const defaultOptions = {};
