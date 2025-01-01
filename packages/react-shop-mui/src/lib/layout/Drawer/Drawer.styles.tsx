import { FlexBox, FlexBoxProps } from '@views/FlexBox';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';
import { scrollBarStyles } from '@common/scrollBar';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

const PREFIX = 'ShopDrawer';

export const StyledDrawerClasses = {
  closeIcon: `${PREFIX}-closeIcon`,
  content: `${PREFIX}-content`,
};

export const StyledDrawer: StyledComponent<FlexBoxProps> = styled(FlexBox, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  position: 'relative',
  flexDirection: 'column',
  width: '100dvw',
  height: '100%',
  overflow: 'hidden',
  maxWidth: '500px',
  backgroundColor: theme.palette.common.white,
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    backgroundColor: theme.palette.common.black,
  }),
  [`& .${StyledDrawerClasses.content}`]: {
    overflow: 'auto',
    width: '100%',
    height: '100%',
    display: 'flex',
    ...scrollBarStyles,
    ['& > *']: {
      flexGrow: 0,
      margin: 'auto',
      minWidth: '300px',
    },
  },
  [`& .${StyledDrawerClasses.closeIcon}`]: {
    position: 'absolute',
    right: 20,
    top: 12,
    zIndex: 100,
  },
}));
