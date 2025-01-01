import { Shadows, createTheme } from '@mui/material/styles';

const shadows = [
  'none',
  '0px 1px 3px rgba(3, 0, 71, 0.09)',
  '0px 3px 16px rgba(43, 52, 69, 0.1)',
  '0px 8px 45px rgba(3, 0, 71, 0.09)',
  '0px 0px 28px rgba(3, 0, 71, 0.01)',
  '0px 3px 16px rgba(43, 52, 69, 0.2)',
];

export const shadowsOverrites = (): Shadows => {
  const themeShadows = createTheme().shadows;

  for (let i = 0; i < shadows.length; i++) {
    themeShadows[i] = shadows[i];
  }
  return themeShadows;
};
