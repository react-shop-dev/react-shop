import type { Theme } from '@mui/material/styles';
import styled from '@mui/material/styles/styled';
import Box, { BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

const PREFIX = 'ShopTopBar';

export const TopBarClasses = {
  container: `${PREFIX}-container`,
  expand: `${PREFIX}-expand`,
  navbar: `${PREFIX}-navbar`,
};

export const StyledTopBar: StyledComponent<BoxProps & { expand?: boolean }> = styled(Box, {
  name: PREFIX,
  shouldForwardProp: prop => prop !== 'expand',
})<{
  expand?: boolean;
  theme?: Theme;
}>(({ theme, expand }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.getContrastText(theme.palette.background.default),
  padding: `${theme.spacing(0.5)} 0px`,
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    color: 'white',
    backgroundColor: '#000',
  }),
  [`& .${TopBarClasses.expand}`]: {
    display: 'none',
  },
  [`& .${TopBarClasses.expand}`]: {
    display: 'none',
    padding: 0,
  },
  [`& .${TopBarClasses.container}`]: {
    flexWrap: 'wrap',
  },
  [theme.breakpoints.down('md')]: {
    [`& .${TopBarClasses.container}`]: {
      flexDirection: 'row-reverse',
    },
    [`& .${TopBarClasses.expand}`]: {
      display: 'flex',
    },
    [`& .${TopBarClasses.navbar}`]: {
      display: expand ? 'block' : 'none',
      order: 1,
      flex: '0 0 100%',
    },
  },
}));
