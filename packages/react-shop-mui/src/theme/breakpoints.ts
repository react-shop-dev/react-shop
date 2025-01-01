import type { Breakpoint } from '@mui/material/styles';

export const breakpoints: { values: { [key in Breakpoint]: number } } = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};
