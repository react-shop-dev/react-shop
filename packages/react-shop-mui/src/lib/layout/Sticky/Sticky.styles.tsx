import styled from '@mui/material/styles/styled';
import { keyframes } from '@mui/material/styles';
import Box, { type BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';

const slideDown = keyframes`
  from {transform: translateY(-200%)}
  to {transform: translateY(0)}
`;

const PREFIX = 'ShopSticky';

export const StyledSticky: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  '& .hold': {
    position: 'relative',
  },
  '& .fixed': {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.enteringScreen,
    }),
    animation: `${slideDown} 320ms ${theme.transitions.easing.easeInOut}`,
  },
}));
