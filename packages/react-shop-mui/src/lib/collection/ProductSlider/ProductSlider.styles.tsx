import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopSlider';

export const StyledProductSlider: StyledComponent<BoxProps & { hoverMode: boolean }> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
  shouldForwardProp: prop => prop !== 'hoverMode',
})<{ hoverMode: boolean }>(({ theme, hoverMode }) => ({
  display: 'block',
  position: 'relative',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  ['& .mui-shop-carousel']: {
    paddingBottom: theme.spacing(0.5),
  },
  ...(hoverMode && {
    ['& .mui-shop-carousel-controls']: {
      opacity: 0,
      transition: 'opacity 320ms ease-in-out',
    },
    '&:hover': {
      ['.mui-shop-carousel-controls']: {
        opacity: 1,
      },
    },
  }),
}));
