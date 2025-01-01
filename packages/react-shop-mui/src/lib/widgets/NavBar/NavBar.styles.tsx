import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';

const PREFIX = 'ShopNavLink';

export const StyledNavItemLinkClasses = {
  active: `${PREFIX}-active`,
};

export const StyledNavLink = styled(Button, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  fontSize: 'inherit',
  textTransform: 'none',
  opacity: 0.7,
  ':hover': {
    opacity: 1,
    backgroundColor: 'transparent',
  },
  marginRight: theme.spacing(1),
  [`&.${StyledNavItemLinkClasses.active}`]: {
    opacity: 1,
    color: theme.palette.primary.main,
  },
  '&:first-child': {
    paddingLeft: 0,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginRight: 0,
    marginBottom: theme.spacing(1),
  },
})) as typeof Button;
