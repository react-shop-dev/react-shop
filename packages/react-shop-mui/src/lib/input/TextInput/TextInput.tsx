'use client';
import { FocusEvent, forwardRef, useCallback, ReactElement } from 'react';
import { useInput, Validator, FieldTitle } from 'react-shop';
import { useTranslate } from 'react-shop/translate';
import clsx from 'clsx';
import styled from '@mui/material/styles/styled';
import type { SxProps } from '@mui/material/styles';
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { InputHelperText } from '../InputHelperText';
import { sanitizeInputRestProps } from '../sanitizeInputRestProps';

export interface CommonInputProps {
  source: string;
  resource?: string;
  format?: (value: any) => any;
  parse?: (value: any) => any;
  id?: string;
  defaultValue?: any;
  readOnly?: boolean;
  label?: ReactElement | string | boolean;
  helperText?: ReactElement | string | boolean;
  validate?: Validator | Validator[];
  sx?: SxProps;
}

export type TextInputProps = Omit<TextFieldProps, 'onChange' | 'helperText' | 'label' | 'ref'> &
  CommonInputProps & {
    resettable?: boolean;
    onChange?: (value: any) => void;
  };

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    source,
    resource,
    defaultValue,
    label,
    format,
    parse,
    disabled,
    className,
    margin,
    onFocus,
    onBlur,
    onChange,
    resettable,
    helperText,
    validate,
    readOnly,
    InputProps = {},
    ...rest
  } = props;

  const { endAdornment, ...InputPropsWithoutEndAdornment } = InputProps;

  const {
    id,
    field,
    fieldState: { error, invalid },
    isRequired,
  } = useInput({
    defaultValue,
    source,
    resource,
    type: 'text',
    onChange,
    onBlur,
    format,
    parse,
    validate,
    readOnly,
  });

  const translate = useTranslate();

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onFocus && onFocus(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(() => {
    field.onBlur && field.onBlur();
  }, [field]);

  const handleClickClearButton = useCallback(
    (event: any) => {
      event.preventDefault();
      field.onChange && field.onChange('');
    },
    [field],
  );

  const getEndAdornment = () => {
    if (resettable) {
      if (field.value) {
        return (
          <InputAdornment position="end">
            <IconButton
              className={TextFieldClasses.clearButton}
              title={translate('rs.action.clear_input_value')}
              disabled={disabled || readOnly}
              size="small"
              onClick={handleClickClearButton}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        );
      } else if (endAdornment) {
        return endAdornment;
      } else {
        return (
          <InputAdornment position="end">
            <span>&nbsp;</span>
          </InputAdornment>
        );
      }
    } else {
      return endAdornment;
    }
  };

  const renderHelperText = helperText !== false || invalid;

  return (
    <StyledTextField
      id={id}
      className={clsx(`rs-input-${source}`, className)}
      label={
        label !== '' && label !== false ? (
          <FieldTitle label={label} isRequired={isRequired} />
        ) : null
      }
      InputProps={{
        readOnly: readOnly,
        classes: { adornedEnd: TextFieldClasses.inputAdornmentEnd },
        endAdornment: getEndAdornment(),
        ...InputPropsWithoutEndAdornment,
      }}
      helperText={
        renderHelperText ? <InputHelperText error={error?.message} helperText={helperText} /> : null
      }
      disabled={disabled || readOnly}
      margin={margin}
      error={invalid}
      {...field}
      {...sanitizeInputRestProps(rest)}
      inputRef={ref}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
});

TextInput.displayName = 'ShopTextInput';

const PREFIX = 'ShopTextField';

export const TextFieldClasses = {
  clearButton: `${PREFIX}-clearButton`,
  inputAdornmentEnd: `${PREFIX}-inputAdornmentEnd`,
};

const StyledTextField = styled(MuiTextField, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  [`& .${TextFieldClasses.inputAdornmentEnd}`]: {
    paddingRight: 4,
  },
});
