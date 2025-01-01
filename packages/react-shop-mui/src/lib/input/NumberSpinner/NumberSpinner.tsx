'use client';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { UseNumberInputOptions, useNumberInput } from 'react-shop';
import InputBase, { type InputBaseProps } from '@mui/material/InputBase';
import { type ButtonBaseProps } from '@mui/material/ButtonBase';
import InputAdornment, { type InputAdornmentProps } from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { StyledSpinnerButton } from './NumberSpinner.styles';

export type NumberSpinnerProps = UseNumberInputOptions &
  Omit<InputBaseProps, 'onChange'> & {
    value: number;
    incrementIcon?: ReactNode;
    decrementIcon?: ReactNode;
    DecrementProps?: ButtonBaseProps;
    IncrementProps?: ButtonBaseProps;
    InputAdornmentProps?: InputAdornmentProps;
  };

const defaultIncrementIcon = <AddIcon />;
const defaultDecrementIcon = <RemoveIcon />;

export const NumberSpinner = forwardRef<unknown, NumberSpinnerProps>((props, ref) => {
  const {
    min = 1,
    incrementIcon = defaultIncrementIcon,
    decrementIcon = defaultDecrementIcon,
    DecrementProps,
    IncrementProps,
    InputAdornmentProps,
    inputProps,
    sx = {},
  } = props;

  const { inputRef, getInputProps, getIncrementProps, getDecrementProps } = useNumberInput({
    ...props,
    min,
  });

  return (
    <InputBase
      ref={ref}
      inputRef={inputRef}
      size="small"
      readOnly
      inputProps={{
        size: 2,
        ...inputProps,
        ...getInputProps(props),
      }}
      sx={{
        border: 'none',
        '& input': {
          textAlign: 'center',
        },
        ...sx,
      }}
      startAdornment={
        <InputAdornment position="start" {...InputAdornmentProps}>
          <StyledSpinnerButton
            {...DecrementProps}
            {...getDecrementProps(DecrementProps)}
            ownerState={{ type: 'decrement' }}
          >
            {decrementIcon}
          </StyledSpinnerButton>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end" {...InputAdornmentProps}>
          <StyledSpinnerButton
            {...IncrementProps}
            {...getIncrementProps(IncrementProps)}
            ownerState={{ type: 'increment' }}
          >
            {incrementIcon}
          </StyledSpinnerButton>
        </InputAdornment>
      }
    />
  );
});

NumberSpinner.displayName = 'NumberSpinner';
