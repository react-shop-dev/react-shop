import { HTMLAttributes } from 'react';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

const PREFIX = 'ShopPicture';

export const LazyImageClasses = {
  image: `${PREFIX}-image`,
  imageBar: `${PREFIX}-imageBar`,
};

export const StyledPicture: StyledComponent<HTMLAttributes<HTMLElement>> = styled('picture', {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  display: 'block',
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.common.white,
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    backgroundColor: theme.palette.onyx.light,
  }),
  [`& .${LazyImageClasses.image}`]: {},
  [`& .${LazyImageClasses.imageBar}`]: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));
