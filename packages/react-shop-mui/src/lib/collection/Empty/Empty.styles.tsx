import styled from '@mui/material/styles/styled';
import Box, { type BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopEmptyGrid';

export const EmptyClasses = {
  icon: `${PREFIX}-icon`,
};

export const StyledEmpty: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  marginTop: '10rem',
  [`& .${EmptyClasses.icon}`]: {
    width: '2em',
    height: '2em',
    color: 'gray',
  },
});
