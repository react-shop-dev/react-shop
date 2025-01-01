import { onyx, primary } from './colors';

const darkTheme = {
  dark: {
    palette: {
      common: { black: onyx.dark },
      primary: { ...primary },
      background: {
        default: onyx.dark,
        paper: onyx.light,
      },
      text: {
        primary: '#fff',
      },
    },
  },
};

export default darkTheme;
