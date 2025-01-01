import { HTMLAttributes } from 'react';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopMenu';

export const StyledMenuClasses = {
  navigation: `${PREFIX}-navigation`,
};

export const StyledMenu: StyledComponent<HTMLAttributes<HTMLElement>> = styled('nav', {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  position: 'relative',
  fontSize: theme.typography.fontSize,
  [`& .${StyledMenuClasses.navigation}`]: {
    display: 'flex',
    alignItems: 'center',
  },
}));
