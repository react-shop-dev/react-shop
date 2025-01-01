import MuiButton, { type ButtonProps } from '@mui/material/Button';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopButton';

export const StyledButton: StyledComponent<ButtonProps> = styled(MuiButton, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})({});
