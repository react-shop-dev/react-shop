import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopGridContainer';

export const StyledGridContainer: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  marginBottom: '1rem',
  paddingBottom: '1rem',
});
