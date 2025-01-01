import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import MuiDialog, { DialogProps } from '@mui/material/Dialog';

const PREFIX = 'ShopDialog';

export const StyledDialogClasses = {
  title: `${PREFIX}-title`,
  content: `${PREFIX}-content`,
  closeIcon: `${PREFIX}-closeIcon`,
};

export const StyledDialog: StyledComponent<DialogProps> = styled(MuiDialog, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  [`& .${StyledDialogClasses.closeIcon}`]: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: theme.palette.grey[500],
    zIndex: theme.zIndex.modal,
  },
  [`& .${StyledDialogClasses.title}`]: {
    paddingRight: theme.spacing(5),
    wordBreak: 'break-word',
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'capitalize',
  },
  [`& .${StyledDialogClasses.content}`]: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
