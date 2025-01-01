import Box, { BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';
import styled from '@mui/material/styles/styled';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import { CatalogMenuClasses } from '../../widgets/CatalogMenu/CatalogMenu.styles';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

const PREFIX = 'ShopHeader';

export const HeaderClasses = {
  logo: `${PREFIX}-logo`,
  row: `${PREFIX}-row`,
};

export const StyledHeader: StyledComponent<AppBarProps> = styled(MuiAppBar, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
  shouldForwardProp: prop => prop !== 'fixed',
})<{ fixed?: boolean }>(({ theme, fixed }) => ({
  paddingTop: fixed ? theme.spacing(0.5) : theme.spacing(1),
  paddingBottom: fixed ? theme.spacing(0.5) : theme.spacing(1),
  backgroundColor: theme.palette.common.white,
  color: 'inherit',
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    backgroundColor: theme.palette.common.black,
  }),

  [`& .${HeaderClasses.row}`]: {
    gap: 2,
    padding: `${theme.spacing(1)} 0`,
  },
  [theme.breakpoints.down('md')]: {
    [`& .${CatalogMenuClasses.menu}`]: {
      display: 'none',
    },
    [`& .${HeaderClasses.logo}`]: {
      marginRight: 'auto',
    },
  },
  [theme.breakpoints.down('sm')]: {
    ['& .mui-shop-app-bar-buttons']: {
      display: 'none',
    },
  },
}));

export const StyledShopButton: StyledComponent<BoxProps> = styled(Box)(({ theme }) => ({
  ['&:empty']: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
