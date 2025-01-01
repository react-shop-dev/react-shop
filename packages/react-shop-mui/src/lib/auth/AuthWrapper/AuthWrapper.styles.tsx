import styled from '@mui/material/styles/styled';
import Box, { type BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopAuthWrapper';

export const AuthWrapperClasses = {
  card: `${PREFIX}-card`,
  cardContent: `${PREFIX}-cardContent`,
  topBar: `${PREFIX}-topBar`,
  icon: `${PREFIX}-icon`,
  backArrow: `${PREFIX}-backArrow`,
};

export const StyledAuthWrapper: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  height: 'max-content',
  borderRadius: '8px',
  [`& .${AuthWrapperClasses.card}`]: {
    minWidth: 320,
    maxWidth: 450,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'calc(100dvw - 124px)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiCardContent-root': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  [`& .${AuthWrapperClasses.topBar}`]: {
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'center',
    margin: `${theme.spacing(1)} auto`,
    position: 'relative',
  },
  [`& .${AuthWrapperClasses.backArrow}`]: {
    position: 'absolute',
    left: 0,
  },
  [`& .${AuthWrapperClasses.cardContent}`]: {},
}));
