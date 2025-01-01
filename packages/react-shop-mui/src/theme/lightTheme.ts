import { onyx, palette, primary } from './colors';

const lightTheme = {
  light: {
    palette: {
      ...palette,
      common: { black: onyx.dark },
      background: {
        default: '#ffffff',
      },
      primary: { ...primary },
    },
  },
};

export default lightTheme;
