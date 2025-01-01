import { typography } from './typography';
import { breakpoints } from './breakpoints';
import { components } from './components';
import { shadowsOverrites } from './shadows';

export const SIDEBAR_WIDTH = 280;

const customThemeProps = {
  sidebar: {
    width: SIDEBAR_WIDTH,
  },
};

const defaultTheme = {
  typography,
  breakpoints,
  components,
  shadows: shadowsOverrites(),
  ...customThemeProps,
};

export default defaultTheme;
