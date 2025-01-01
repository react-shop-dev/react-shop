'use client';

import { ChangeEvent, useCallback, isValidElement, ReactElement } from 'react';
import { useTranslate, useChoices, useInput, FieldTitle, ChoicesProps } from 'react-shop';
import clsx from 'clsx';
import styled from '@mui/material/styles/styled';
import MenuItem from '@mui/material/MenuItem';
import type { TextFieldProps } from '@mui/material/TextField';
import { CommonInputProps, TextInput } from '../TextInput';
import { InputHelperText } from '../InputHelperText';
import { LoadingInput } from '../LoadingInput';
import { sanitizeInputRestProps } from '../sanitizeInputRestProps';

type MuiSelectInputProps = CommonInputProps &
  ChoicesProps &
  Omit<TextFieldProps, 'label' | 'helperText' | 'classes' | 'onChange' | 'ref'> & {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    resettable?: boolean;
    emptyText?: string | ReactElement;
    emptyValue?: any;
    disableValue?: string;
    isLoading?: boolean;
  };

export const SelectInput = (props: MuiSelectInputProps) => {
  const {
    className,
    source,
    fullWidth,
    margin,
    label,
    helperText,
    onChange,
    onBlur,
    parse,
    format,
    validate,
    emptyText = '',
    emptyValue = '',
    disableValue = 'disabled',
    translateChoice = true,
    choices,
    optionText,
    optionValue,
    defaultValue,
    isLoading,
    ...rest
  } = props;

  const translate = useTranslate();

  const { getChoiceText, getChoiceValue, getDisableValue } = useChoices({
    optionText,
    optionValue,
    disableValue,
    translateChoice,
  });

  const {
    id,
    field,
    fieldState: { invalid, error },
    isRequired,
  } = useInput({
    defaultValue,
    source,
    onChange,
    onBlur,
    validate,
    parse,
    format,
  });

  const handleOnChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target) {
        field.onChange(event);
      }
    },
    [field],
  );

  const renderEmptyItemOption = useCallback(() => {
    return isValidElement(emptyText) || typeof emptyText !== 'string'
      ? emptyText
      : emptyText === ''
        ? ' '
        : translate(emptyText, { _: emptyText });
  }, [translate, emptyText]);

  const renderMenuItemOption = useCallback(
    (choice: unknown) => getChoiceText(choice),
    [getChoiceText],
  );

  const renderMenuItem = useCallback(
    (choice: unknown) => {
      return choice ? (
        <MenuItem
          key={getChoiceValue(choice)}
          value={getChoiceValue(choice)}
          disabled={getDisableValue(choice)}
        >
          {renderMenuItemOption(choice)}
        </MenuItem>
      ) : null;
    },
    [getChoiceValue, getDisableValue, renderMenuItemOption],
  );

  const renderHelperText = helperText !== false && invalid;

  if (isLoading) {
    return (
      <LoadingInput
        label={<FieldTitle label={label} isRequired={isRequired} />}
        margin={margin}
        fullWidth={fullWidth}
        variant={props.variant}
        size={props.size}
        sx={props.sx}
        helperText={
          renderHelperText ? (
            <InputHelperText error={error?.message} helperText={helperText} />
          ) : undefined
        }
      />
    );
  }

  return (
    <StyledTextInput
      id={id}
      select
      {...field}
      source={source}
      error={invalid}
      className={clsx('rs-input', `rs-input-${source}`, className)}
      label={<FieldTitle label={label} isRequired={isRequired} />}
      margin={margin}
      fullWidth={fullWidth}
      onChange={handleOnChange}
      helperText={
        renderHelperText ? <InputHelperText error={error?.message} helperText={helperText} /> : null
      }
      {...sanitizeInputRestProps(rest)}
    >
      {!isRequired ? (
        <MenuItem
          key="null"
          value={emptyValue}
          title={translate('rs.action.clear_input_value')}
          arai-label={translate('rs.action.clear_input_value')}
        >
          {renderEmptyItemOption()}
        </MenuItem>
      ) : null}
      {choices?.map(renderMenuItem)}
    </StyledTextInput>
  );
};

const PREFIX = 'ShopSelectInput';

const StyledTextInput = styled(TextInput, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  minWidth: '25ch',
});
