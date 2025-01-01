import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import ButtonBase, { type ButtonBaseProps } from '@mui/material/ButtonBase';

const PREFIX = 'ShopSpinnerButton';

export const StyledSpinnerButton: StyledComponent<
  ButtonBaseProps & { ownerState: { type: 'increment' | 'decrement' } }
> = styled(ButtonBase, {
  name: PREFIX,
  slot: 'Button',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.button, styles[ownerState.type]];
  },
})<{ ownerState: { type: 'increment' | 'decrement' } }>(({ theme, ownerState }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  border: `1px solid ${theme.palette.grey[600]}`,
  width: 30,
  height: 30,
  '&:hover:not(.Mui-disabled)': {
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
  ...(ownerState.type === 'increment' && {
    marginRight: -10,
  }),
  ...(ownerState.type === 'decrement' && {
    marginLeft: -10,
  }),
}));
