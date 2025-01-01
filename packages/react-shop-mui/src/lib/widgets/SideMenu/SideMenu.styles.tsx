import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import styled from '@mui/material/styles/styled';
import { type SimpleTreeViewProps } from '@mui/x-tree-view/SimpleTreeView';
import type { StyledComponent } from '@emotion/styled';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

const PREFIX = 'ShopSideMenu';

export const StyledTreeView: StyledComponent<SimpleTreeViewProps<any>> = styled(SimpleTreeView, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.common.white,
  ...theme.applyStyles(COLOR_SCHEME_DARK, {
    backgroundColor: theme.palette.common.black,
  }),
  marginBottom: '-4px',
}));
