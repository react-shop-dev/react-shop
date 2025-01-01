import type { AnchorHTMLAttributes } from 'react';
import type { StyledComponent } from '@emotion/styled';
import styled from '@mui/material/styles/styled';

export const StyledSocialLink: StyledComponent<AnchorHTMLAttributes<HTMLAnchorElement>> = styled(
  'a',
)(({ theme }) => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  transition: 'color 120ms ease-in-out',
  ':hover': {
    color: theme.palette.primary.dark,
  },
  '& > svg': {
    verticalAlign: 'middle',
  },
}));
