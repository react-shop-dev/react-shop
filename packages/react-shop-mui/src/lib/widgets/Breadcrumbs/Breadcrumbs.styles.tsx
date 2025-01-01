import styled from '@mui/material/styles/styled';
import MuiBreadcrumbs, { type BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import type { StyledComponent } from '@emotion/styled';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

const PREFIX = 'ShopBreadcrumbs';

export const StyledBreadcrumbsClasses = {
  label: `${PREFIX}-label`,
  icon: `${PREFIX}-icon`,
};

export const StyledBreadcrumbs: StyledComponent<BreadcrumbsProps> = styled(MuiBreadcrumbs, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.common.white,
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    backgroundColor: theme.palette.common.black,
    border: '1px solid transparent',
    color: 'white',
  }),
  [`& .${StyledBreadcrumbsClasses.label}`]: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
    color: 'inherit',
  },
  [`& a.${StyledBreadcrumbsClasses.label}`]: {
    color: theme.palette.grey[600],
  },
  [`& .${StyledBreadcrumbsClasses.icon}`]: {
    marginRight: theme.spacing(0.5),
    fontSize: 'inherit',
  },
}));
