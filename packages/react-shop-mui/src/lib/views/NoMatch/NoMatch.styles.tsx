import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import Box, { BoxProps } from '@mui/material/Box';

const PREFIX = 'ShopNoMatch';

export const NotMatchClasses = {
  icon: `${PREFIX}-icon`,
  message: `${PREFIX}-message`,
  toolbar: `${PREFIX}-toolbar`,
};

export const StyledNoMatch: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})({
  display: 'flex',
  flex: 1,
  minHeight: '100dvh',
  [`& .${NotMatchClasses.icon}`]: {
    width: '3em',
    height: '3em',
    marginBottom: 8,
  },
  [`& .${NotMatchClasses.message}`]: {
    opacity: 0.7,
  },
  [`& .${NotMatchClasses.toolbar}`]: {
    marginTop: '1.5em',
  },
});
