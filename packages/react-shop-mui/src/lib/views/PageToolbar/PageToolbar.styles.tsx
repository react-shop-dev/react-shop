import MuiToolbar, { type ToolbarProps } from '@mui/material/Toolbar';
import styled from '@mui/material/styles/styled';
import type { StyledComponent } from '@emotion/styled';

export const StyledPageToolbar: StyledComponent<ToolbarProps> = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',
  position: 'relative',
  color: theme.palette.grey[600],
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '> *:not(:last-child)': {
    marginRight: theme.spacing(3),
  },
}));
