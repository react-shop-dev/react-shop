import styled from '@mui/material/styles/styled';
import Box, { BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

const PREFIX = 'ShopCentered';

export const StyledCentered: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    backgroundColor: 'inherit',
  }),
}));
