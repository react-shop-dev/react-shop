'use client';

import { useEffect } from 'react';
import { CountryIso2, FlagImage, usePhoneInput } from 'react-international-phone';
import { FieldTitle, useInput } from 'react-shop';
import { InputHelperText } from 'react-shop-mui/InputHelperText';
import { TextInput, type TextInputProps } from 'react-shop-mui/TextInput';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { countries } from '@/lib/mocks';

export const PhoneInput = (props: TextInputProps & { country?: string }) => {
  const {
    source,
    country: countryProp,
    defaultValue,
    name,
    disabled,
    readOnly,
    label,
    helperText,
    ...rest
  } = props;

  const { field, fieldState, isRequired } = useInput({ name, source, defaultValue, readOnly });

  const { phone, inputRef, country, handlePhoneValueChange, setCountry } = usePhoneInput({
    ...(countryProp ? { defaultCountry: countryProp } : {}),
    prefix: '+',
    onChange: ({ inputValue }) => {
      field.onChange(inputValue);
    },
  });

  useEffect(() => {
    if (countryProp) {
      setCountry(countryProp);
    }
  }, [countryProp, setCountry]);

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event?.target?.value as CountryIso2);
  };

  const { error, invalid } = fieldState;
  const renderHelperText = helperText !== false || invalid;

  return (
    <StyledTextField
      type="tel"
      {...field}
      error={invalid}
      defaultValue={phone}
      source={source}
      inputRef={inputRef}
      disabled={disabled || readOnly}
      onChange={handlePhoneValueChange}
      label={label ? <FieldTitle label={label} isRequired={isRequired} /> : undefined}
      helperText={
        renderHelperText ? (
          <InputHelperText error={error?.message} helperText={helperText} />
        ) : undefined
      }
      {...rest}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" className={PhoneInputClasses.inputAdornment}>
              <Select
                size="small"
                value={country.iso2}
                onChange={handleCountryChange}
                renderValue={value => <FlagImage iso2={value} style={{ width: 20 }} />}
                MenuProps={{
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  style: {
                    height: '300px',
                  },
                }}
                sx={{
                  width: 'max-content',
                  fieldset: {
                    display: 'none',
                  },
                }}
              >
                {countries.map(country => {
                  return (
                    <MenuItem
                      key={country.code}
                      value={country.code}
                      sx={{ display: 'flex', gap: 1.5 }}
                    >
                      <FlagImage iso2={country.code} style={{ width: 20 }} />
                      <Typography>{country.name}</Typography>
                      <Typography color="gray">+{country.dialCode}</Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

const PREFIX = 'ShopPhoneInput';

export const PhoneInputClasses = {
  inputAdornment: `${PREFIX}-inputAdornment`,
};

const StyledTextField = styled(TextInput, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  [`& .${PhoneInputClasses.inputAdornment}`]: {
    marginLeft: '-8px',
    '.MuiSelect-select': {
      display: 'flex',
    },
    '&.Mui-focused:has(div[aria-expanded="false"])': {
      fieldset: {
        display: 'block',
      },
    },
  },
});
