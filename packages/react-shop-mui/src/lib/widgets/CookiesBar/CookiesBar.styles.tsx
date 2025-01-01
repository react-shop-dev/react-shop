import Box, { type BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';
import styled from '@mui/material/styles/styled';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

const PREFIX = 'ShopCookiesBar';

export const CookiesBarClasses = {
  actions: `${PREFIX}-actions`,
};

export const StyledCookiesBar: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: '33dvw',
  minWidth: '500px',
  maxWidth: '800px',
  zIndex: theme.zIndex.snackbar,
  color: 'inherit',
  backgroundColor: theme.palette.common.white,
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    backgroundColor: theme.palette.common.black,
  }),
  left: '50%',
  transform: 'translateX(-50%)',
  [`& .${CookiesBarClasses.actions}`]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 'calc(100dvw - 124px)',
    [`& .${CookiesBarClasses.actions}`]: {
      flexDirection: 'column',
    },
  },
  ['& .MuiAlert-message']: {
    width: '100%',
  },
  '& a': {
    textDecoration: 'underline',
  },
}));
