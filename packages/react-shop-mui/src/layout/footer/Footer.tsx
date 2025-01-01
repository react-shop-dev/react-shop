import { memo } from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import styled from '@mui/material/styles/styled';
import { Copyright } from './Copyright';
import Creator from './Creator';
import { FlexBetween } from '@views/FlexBetween';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

export type FooterProps = unknown;

export const Footer = memo(() => (
  <StyledFooter>
    <Divider />
    <Container>
      <FlexBetween className={FooterClasses.wrapper}>
        <Copyright />
        <Creator />
      </FlexBetween>
    </Container>
  </StyledFooter>
));

const PREFIX = 'ShopFooter';

const FooterClasses = {
  wrapper: `${PREFIX}-wrapper`,
};

const StyledFooter = styled('footer', {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: 'inherit',
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    backgroundColor: '#000',
  }),
  [`& .${FooterClasses.wrapper}`]: {
    gap: 4,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

Footer.displayName = 'Footer';
