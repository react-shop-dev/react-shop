import styled from '@mui/material/styles/styled';
import Box, { type BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopImageGallery';

export const ImageGalleryClasses = {
  image: `${PREFIX}-image`,
};

export const StyledImageGallery: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  ['& .Mui-disabled']: {
    display: 'none',
  },
  [`& .${ImageGalleryClasses.image}`]: {
    cursor: 'pointer',
    borderRadius: theme.spacing(1),
    border: `2px solid ${theme.palette.grey[400]}`,
    '&.active': {
      borderColor: theme.palette.primary.main,
    },
  },
}));
