import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

export const StyledIconButton: StyledComponent<IconButtonProps> = styled(IconButton)(
  ({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1.5),
    },
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles(COLOR_SCHEME_DARK, { backgroundColor: theme.palette.onyx.light }),
    color: theme.palette.getContrastText(theme.palette.background.default),
  }),
);
