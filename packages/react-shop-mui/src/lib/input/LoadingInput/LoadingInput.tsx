'use client';
import type { ReactElement } from 'react';
import { useTimeout } from 'react-shop';
import styled from '@mui/material/styles/styled';
import type { SxProps } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import { TextInput } from '../TextInput';

export interface LoadinInputProps {
  fullWidth?: boolean;
  label?: ReactElement | string | boolean;
  helperText?: ReactElement;
  sx?: SxProps;
  size?: TextFieldProps['size'];
  timeout?: number;
  margin?: TextFieldProps['margin'];
  variant?: TextFieldProps['variant'];
}

export const LoadingInput = (props: LoadinInputProps) => {
  const { sx, label, helperText, fullWidth, size, timeout = 1000 } = props;

  const timeoutPassed = useTimeout(timeout);

  return (
    <StyledLoadingInput
      source=""
      disabled
      sx={sx}
      label={label}
      helperText={helperText}
      fullWidth={fullWidth}
      size={size}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {timeoutPassed ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <span style={{ width: 20 }}>&nbsp;</span>
              )}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

const PREFIX = 'ShopLoadingInput';

const StyledLoadingInput = styled(TextInput, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  '& .MuiInputLabel-root.Mui-disabled': {
    color: theme.palette.text.secondary,
  },
  '& .MuiFilledInput-root.Mui-disabled:before': {
    borderBottomStyle: 'solid',
  },
}));
