'use client';

import { isValidElement, type ReactNode, type MouseEvent } from 'react';
import type { Identifier } from 'react-shop-types';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { type ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function ToggleOptions<T extends ToggleOption>(props: ToggleOptionsProps<T>) {
  const {
    value,
    label,
    option,
    onHandleChange,
    size = 'small',
    color = 'info',
    orientation = 'horizontal',
    className,
    ...rest
  } = props;

  const optionValues = option?.values || [];
  const filteredOptions = optionValues.map(v => v.value).filter(onlyUnique);

  const handleChange = (_event: MouseEvent<HTMLElement>, inputValue: string) => {
    onHandleChange(inputValue);
  };

  return (
    <Box>
      {label ? <Typography gutterBottom>{label}</Typography> : null}
      <ToggleButtonGroup
        size={size}
        color={color}
        className={className}
        orientation={orientation}
        {...rest}
        value={value}
        exclusive
        aria-label={value}
        onChange={handleChange}
      >
        {filteredOptions.map((optionValue, index) => (
          <ToggleButton key={optionValue} value={optionValue} disabled={optionValue === value}>
            {isValidElement(optionValues[index].title) ? optionValues[index].title : optionValue}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

const onlyUnique = (value: unknown, index: number, self: unknown[]) =>
  self.indexOf(value) === index;

type ToggleOptionValue = { value: string; title?: string | ReactNode; [key: string]: any };

type ToggleOption = {
  id?: Identifier;
  title?: string;
  values: ToggleOptionValue[];
};

export type ToggleOptionsProps<Option> = ToggleButtonGroupProps & {
  label?: string;
  option: Option;
  onHandleChange: (value: string) => void;
};
