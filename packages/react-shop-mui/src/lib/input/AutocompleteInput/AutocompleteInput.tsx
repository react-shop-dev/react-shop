'use client';
import { useCallback, useState, useMemo, useEffect, SyntheticEvent } from 'react';
import type { Product } from 'react-shop-types';
import { useTranslate, useChoices, useInput, UseAutocompleteResult, FieldTitle } from 'react-shop';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import clsx from 'clsx';
import MuiAutocomplete, {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteProps,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField';
import type { CommonInputProps } from '../TextInput';
import { InputHelperText } from '../InputHelperText';
import { useSelectedChoice } from '../useSelectedChoice';
import { sanitizeInputRestProps } from '../sanitizeInputRestProps';

const defaultFilterOptions = createFilterOptions();

export interface AutocompleteInputProps<
  OptionType extends Product = Product,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  SupportCreate extends boolean | undefined = false,
> extends AutocompleteProps<OptionType, Multiple, DisableClearable, SupportCreate>,
    Omit<CommonInputProps, 'defaultValue' | 'sx'>,
    Omit<UseAutocompleteResult, 'options'> {
  choices: any[];
  TextFieldProps?: TextFieldProps;
  debounce?: number;
  optionText?: string;
  optionValue?: string;
  emptyText?: string;
  emptyValue?: string;
}

export const AutocompleteInput = <
  OptionType extends Product = Product,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  SupportCreate extends boolean | undefined = false,
>(
  props: Omit<
    AutocompleteInputProps<OptionType, Multiple, DisableClearable, SupportCreate>,
    'renderInput' | 'options'
  >,
) => {
  const {
    defaultValue,
    source,
    choices,
    resource,
    onChange,
    onBlur,
    parse,
    format,
    emptyText,
    emptyValue = '',
    helperText,
    label,
    className,
    optionText,
    optionValue,
    noOptionsText = 'rs.navigation.no_results_found',
    clearOnBlur = true,
    clearText = 'rs.action.clear_input_value',
    closeText = 'rs.action.close',
    openText = 'rs.action.open',
    TextFieldProps,
    fetchError,
    isLoading,
    filterOptions = defaultFilterOptions,
    onSearch,
    onInputChange,
    validate,
    disabled,
    readOnly,
    ...rest
  } = props;

  const [filterValue, setFilterValue] = useState('');
  const translate = useTranslate();

  const finalChoices = useMemo(
    () =>
      emptyText == undefined
        ? choices
        : [
            {
              [optionValue || 'id']: emptyValue,
              [typeof optionText === 'string' ? optionText : 'name']: emptyText,
            },
          ].concat(choices || []),
    [choices, emptyText, optionValue, emptyValue, optionText],
  );

  const {
    id,
    field,
    isRequired,
    fieldState: { error, invalid },
  } = useInput({
    defaultValue,
    source,
    resource,
    onChange,
    onBlur,
    parse,
    format,
    validate,
    disabled,
    readOnly,
  });

  const selectedChoice = useSelectedChoice(field.value, { choices: finalChoices, optionValue });

  const { getChoiceText, getChoiceValue } = useChoices({
    optionText,
    optionValue,
  });

  const getOptionLabel = useCallback(
    (option: any, isListItem = false) => {
      if (option == undefined) {
        return '';
      }
      if (typeof option === 'string') {
        return option;
      }
      if (!isListItem && option[optionValue || 'id'] === emptyValue) {
        return get(option, typeof optionText === 'string' ? optionText : 'name');
      }
      return getChoiceText(option);
    },
    [getChoiceText, emptyValue, optionText, optionValue],
  );

  useEffect(() => {
    const optionLabel = getOptionLabel(selectedChoice);
    if (typeof optionLabel === 'string') {
      setFilterValue(optionLabel);
    }
  }, [getOptionLabel, selectedChoice]);

  const handleAutocompleteChange = (
    _event: SyntheticEvent,
    newValue: any,
    _reason: AutocompleteChangeReason,
  ) => {
    field.onChange(getChoiceValue(newValue) ?? emptyValue);
  };

  const handleInputChange = (
    event: SyntheticEvent,
    newInputValue: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (event?.type === 'change') {
      setFilterValue(newInputValue);
      onSearch(newInputValue);
    }
    if (reason === 'clear') {
      setFilterValue('');
      onSearch('');
    }
    onInputChange?.(event, newInputValue, reason);
  };

  const handleBlur = useCallback(() => {
    if (clearOnBlur) {
      const optionLabel = getOptionLabel(selectedChoice);
      if (!isEqual(optionLabel, filterValue)) {
        setFilterValue(optionLabel);
        onSearch('');
      }
    }
    field.onBlur();
  }, [field, selectedChoice, filterValue, clearOnBlur, getOptionLabel, onSearch]);

  const isOptionEqualToValue = (option: any, value: any) =>
    String(getChoiceValue(option)) === String(getChoiceValue(value));

  const renderHelperText = !!fetchError || helperText !== false || invalid;

  return (
    <MuiAutocomplete
      id={id}
      value={selectedChoice}
      inputValue={filterValue}
      blurOnSelect
      selectOnFocus
      disabled={disabled || readOnly}
      clearOnBlur={clearOnBlur}
      className={clsx('rs-input', className)}
      options={finalChoices}
      clearText={translate(clearText, { _: clearText })}
      closeText={translate(closeText, { _: closeText })}
      openText={translate(openText, { _: openText })}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      filterOptions={filterOptions as any}
      onChange={handleAutocompleteChange}
      onBlur={handleBlur}
      onInputChange={handleInputChange}
      loading={isLoading}
      noOptionsText={
        typeof noOptionsText === 'string'
          ? translate(noOptionsText, { _: noOptionsText })
          : noOptionsText
      }
      renderInput={params => (
        <MuiTextField
          ref={params.InputProps.ref}
          name={field.name}
          error={!!fetchError || invalid}
          label={label !== false ? <FieldTitle label={label} isRequired={isRequired} /> : null}
          helperText={
            renderHelperText ? (
              <InputHelperText
                error={error?.message || fetchError?.message}
                helperText={helperText}
              />
            ) : null
          }
          {...params}
          {...TextFieldProps}
          InputProps={{
            ...params.InputProps,
            ...TextFieldProps?.InputProps,
          }}
        />
      )}
      renderOption={({ key: _key, ...props }, record) => {
        return (
          <li {...props} key={getChoiceValue(record)}>
            {getOptionLabel(record, true)}
          </li>
        );
      }}
      aria-label="Open"
      {...sanitizeInputRestProps(rest)}
    />
  );
};
