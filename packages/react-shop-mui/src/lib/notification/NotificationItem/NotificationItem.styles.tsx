import styled from '@mui/material/styles/styled';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import type { StyledComponent } from '@emotion/styled';

const PREFIX = 'ShopNotification';

export const StyledNotificationClasses: { [key: string]: string } = {
  success: `${PREFIX}-success`,
  error: `${PREFIX}-error`,
  warning: `${PREFIX}-warning`,
  multiline: `${PREFIX}-multiline`,
};

export const StyledSnackbar: StyledComponent<SnackbarProps> = styled(Snackbar, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  [`& .${StyledNotificationClasses.multiline}`]: {
    whiteSpace: 'pre-wrap',
  },
  [`& .${StyledNotificationClasses.success}`]: {},
  [`& .${StyledNotificationClasses.error}`]: {},
  [`& .${StyledNotificationClasses.warning}`]: {},
}));
