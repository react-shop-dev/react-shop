import type { HTMLAttributes } from 'react';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import { StyledPicture } from '../LazyImageHolder/LazyImageHolder.styles';

const PREFIX = 'ShopImageZoom';

export const ImageZoomClasses = {
  imageZoom: `${PREFIX}-imageZoom`,
  iconBox: `${PREFIX}-iconBox`,
  icon: `${PREFIX}-icon`,
};

export const StyledImageZoom: StyledComponent<HTMLAttributes<HTMLElement>> = styled(StyledPicture, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  [`& .${ImageZoomClasses.imageZoom}`]: {
    cursor: 'zoom-in',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0,
    transition: 'opacity 300ms, transform 300ms',
    '&:hover': {
      zIndex: 2,
      opacity: 1,
    },
  },
  [`& .${ImageZoomClasses.iconBox}`]: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    top: 0,
  },
  [`& .${ImageZoomClasses.icon}`]: {
    opacity: 0.8,
    fontSize: '2rem',
    cursor: 'pointer',
    zIndex: 3,
  },
});
