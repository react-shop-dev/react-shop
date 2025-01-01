import type { Typography } from '@mui/material/styles/createTypography';

const fontSize = 14;

export const typography: Partial<Typography> = {
  fontSize,
  fontFamily: 'var(--shop-font-main)',
  htmlFontSize: 16,
  body1: {
    fontSize,
  },
  body2: {
    fontSize,
  },
};
