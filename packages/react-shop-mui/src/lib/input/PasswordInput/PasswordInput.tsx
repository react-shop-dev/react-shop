'use client';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextInput, type TextInputProps } from '../TextInput';

export interface PasswordInputProps extends Omit<TextInputProps, 'ref'> {
  initiallyVisible?: boolean;
}

export const PasswordInput = (props: PasswordInputProps) => {
  const { initiallyVisible = false, ...rest } = props;
  const [visible, setVisible] = useState(initiallyVisible);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <TextInput
      type={visible ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick} size="small">
                {visible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
          autoComplete: 'off',
        },
      }}
      {...rest}
    />
  );
};
