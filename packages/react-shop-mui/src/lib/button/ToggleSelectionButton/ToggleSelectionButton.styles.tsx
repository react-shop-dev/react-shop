import type { HTMLAttributes } from 'react';
import styled from '@mui/material/styles/styled';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopToggleButton';

export const StyledToggleButtonRoot: StyledComponent<HTMLAttributes<HTMLElement>> = styled('span', {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  [`& .${toggleButtonClasses.root}:is(:hover, .${toggleButtonClasses.selected})`]: {
    backgroundColor: theme.palette.success.light,
    color: 'white',
  },
}));
