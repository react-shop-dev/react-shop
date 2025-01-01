import Box, { type BoxProps } from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopSwitchViewMode';

export const SwitchViewModeClasses = {
  label: `${PREFIX}-label`,
};

export const StyledSwitchViewMode: StyledComponent<BoxProps> = styled(Box, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    [`& .${SwitchViewModeClasses.label}`]: {
      display: 'none',
    },
  },
}));
