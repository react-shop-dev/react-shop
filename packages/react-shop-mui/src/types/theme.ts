import {
  CssVarsPalette,
  CssVarsTheme,
  PaletteColorChannel,
  PaletteCommonChannel,
} from '@mui/material/styles';

import {
  PaletteActionChannel,
  PaletteBackgroundChannel,
  PaletteTextChannel,
} from '@mui/material/styles/createThemeWithVars';

declare module '@mui/material/styles' {
  interface Theme extends Omit<CssVarsTheme, 'palette'> {
    sidebar?: {
      width?: number;
    };
  }
  interface ThemeOptions {
    sidebar?: {
      width?: number;
    };
  }
  interface Palette extends CssVarsPalette {
    onyx: Palette['primary'];
  }
  interface PaletteOptions {
    onyx?: PaletteOptions['primary'];
  }
  interface CommonColors extends PaletteCommonChannel {}
  interface PaletteColor extends PaletteColorChannel {}
  interface TypeBackground extends PaletteBackgroundChannel {}
  interface TypeText extends PaletteTextChannel {}
  interface TypeAction extends PaletteActionChannel {}
}
