import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import Box, { BoxProps } from '@mui/material/Box';

const PREFIX = 'ShopError';

export const StyledErrorHandlerClasses = {
  icon: `${PREFIX}-icon`,
};

export const StyledErrorHandler: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  display: 'flex',
  minHeight: '100dvh',
  [`& .${StyledErrorHandlerClasses.icon}`]: {
    width: '2em',
    height: '2em',
  },
});
