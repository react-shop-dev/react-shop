import { orange } from '@mui/material/colors';
import { PaletteOptions, lighten } from '@mui/material/styles';

const primaryBase = '#FFBE98';

export const primary = {
  main: primaryBase,
  dark: orange[500],
  light: lighten(primaryBase, 0.2),
};

export const secondary = {
  light: '#e8e8ee',
  main: '#0f335e',
  dark: '#0c0e30',
};

export const grey = {
  // Line Stroke
  100: '#f5f8fc',
  // Border
  200: '#f0f3f8',
  300: '#e2e8ef',
  // Form text
  400: '#d7dfe5',
  500: '#afb5bf',
  // Paragraph
  600: '#838c9f',
  700: '#515b6f',
  // Main Text
  800: '#3e4556',
  900: '#2e3646',
};

export const success = {
  100: '#e2f7e9',
  200: '#bfefce',
  300: '#96e9b1',
  400: '#4fd77c',
  500: '#33cf66',
  600: '#2dca5e',
  700: '#25c452',
  800: '#1bbc46',
  900: '#0b7724',
  light: '#e2f8ea',
  main: '#31cf66',
};

export const info = {
  50: '#eff3fc',
  100: '#d3ebfc',
  200: '#8fc6fd',
  300: '#9acdff',
  400: '#76b4fd',
  500: '#3672d7',
  600: '#3974d7',
  700: '#2552af',
  800: '#173b91',
  900: '#0d2877',
  light: '#d4eeff',
  main: '#4b96ff',
  contrastText: '#FFFFFF',
};

export const error = {
  100: '#ffe5e5',
  200: '#ffc6c6',
  300: '#ffa3a3',
  400: '#ff6a6a',
  500: '#ff5252',
  600: '#ff4949',
  700: '#ff4040',
  800: '#ff3737',
  900: '#ff2626',
  light: '#ffb9b9',
  main: '#ff6347',
};

export const warning = {
  100: '#fff7e1',
  main: '#ffcd4c',
  contractText: '#FFFFFF',
};

export const onyx = {
  main: '#222',
  dark: '#1c1c1e',
  light: '#2c2c2e',
  contractText: '#7e879c',
};

export const palette: PaletteOptions = {
  grey,
  warning,
  secondary,
  success,
  info,
  error,
  onyx,
  divider: grey[200],
  text: {
    primary: grey[900],
    secondary: grey[800],
    disabled: grey[400],
  },
};
