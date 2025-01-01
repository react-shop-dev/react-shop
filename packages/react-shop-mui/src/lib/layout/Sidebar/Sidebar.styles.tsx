import styled from '@mui/material/styles/styled';
import isNumber from 'lodash/isNumber';
import type { StyledComponent } from '@emotion/styled';
import { scrollBarStyles } from '@common/scrollBar';
import { SIDEBAR_WIDTH } from 'src/theme/defaultTheme';
import { SidebarProps } from './Sidebar';
import type { SxProps } from '@mui/material/styles';

const PREFIX = 'ShopSidebar';

// @ts-ignore children props
export const StyledSidebar: StyledComponent<SidebarProps> = styled('aside', {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
  shouldForwardProp: prop => prop !== 'sticky',
})<{ sticky?: boolean | number; sx?: SxProps }>(({ theme, sticky }) => ({
  position: sticky ? 'sticky' : 'relative',
  flexShrink: 0,
  overflow: 'auto',
  width: theme.sidebar?.width || SIDEBAR_WIDTH,
  zIndex: 1,
  height: '100%',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  padding: theme.spacing(0.5),
  ...(sticky && {
    top: theme.spacing(isNumber(sticky) ? sticky : 10),
    maxHeight: `calc(100dvh - ${theme.spacing((isNumber(sticky) ? sticky : 10) * 2)})`,
  }),
  ...scrollBarStyles,
}));
