import { SIDEBAR_WIDTH } from 'src/theme/defaultTheme';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import Box, { type BoxProps } from '@mui/material/Box';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

const PREFIX = 'ShopPageView';

export const StyledPageRoot: StyledComponent<BoxProps> = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    backgroundColor: 'inherit',
  }),
}));

export const StyledPageContent: StyledComponent<BoxProps & { fullWidth: boolean }> = styled(Box, {
  name: PREFIX,
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root,
  shouldForwardProp: prop => prop !== 'fullWidth',
})<{ fullWidth: boolean }>(({ theme, fullWidth }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    width: fullWidth ? '100%' : `calc(100% - ${theme.sidebar?.width || SIDEBAR_WIDTH}px)`,
    paddingLeft: fullWidth ? 0 : `2rem`,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
