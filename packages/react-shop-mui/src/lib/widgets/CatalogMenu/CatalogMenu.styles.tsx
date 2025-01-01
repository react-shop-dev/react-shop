import styled from '@mui/material/styles/styled';
import Box, { BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopCatalogMenu';

export const CatalogMenuClasses = {
  menu: `${PREFIX}-menu`,
  button: `${PREFIX}-button`,
  icon: `${PREFIX}-icon`,
};

export const StyledCatalogMenu: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  marginRight: 'auto',
  marginLeft: theme.spacing(3),
  '&:hover': {
    [`& .${CatalogMenuClasses.icon}`]: {
      color: theme.palette.primary.main,
    },
  },
  [`& .${CatalogMenuClasses.button}`]: {
    paddingTop: theme.spacing(1 / 2),
    paddingBottom: theme.spacing(1 / 2),
  },
  [`& .${CatalogMenuClasses.menu}`]: {},
}));
