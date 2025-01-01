import styled from '@mui/material/styles/styled';
import Button, { ButtonProps } from '@mui/material/Button';
import type { StyledComponent } from '@emotion/styled';
import Box, { type BoxProps } from '@mui/material/Box';

export const StyledSplitButton: StyledComponent<ButtonProps> = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
  borderColor: theme.palette.grey[500],
}));

export const StyledSplitButtonWrapper: StyledComponent<BoxProps> = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
