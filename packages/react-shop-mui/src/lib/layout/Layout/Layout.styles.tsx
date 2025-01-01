import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import Box, { type BoxProps } from '@mui/material/Box';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

const PREFIX = 'ShopLayout';

export const StyledLayoutClasses = {
  holder: `${PREFIX}-holder`,
};

export const StyledLayout: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  position: 'relative',
  width: '100%',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.getContrastText(theme.palette.background.default),
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    backgroundColor: theme.palette.common.black,
    color: 'white',
  }),
  [`& .${StyledLayoutClasses.holder}`]: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(6),
  },
}));
