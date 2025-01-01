import styled from '@mui/material/styles/styled';
import Box, { type BoxProps } from '@mui/material/Box';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopLoader';

export const StyledLoader: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
