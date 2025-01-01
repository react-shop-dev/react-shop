import MuiToolbar from '@mui/material/Toolbar';
import styled from '@mui/material/styles/styled';

const PREFIX = 'StyledSearchToolbar';

export const SearchToolbarClasses = {
  label: `${PREFIX}-label`,
  total: `${PREFIX}-total`,
};

export const StyledSearchToolbar = styled(MuiToolbar, { name: PREFIX })(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  [`& .${SearchToolbarClasses.label}`]: {
    fontWeight: 600,
    fontSize: '18px',
    color: theme.palette.grey[900],
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[600],
    }),
  },
  [`& .${SearchToolbarClasses.total}`]: {
    color: theme.palette.grey[600],
    ...theme.applyStyles('dark', {
      color: 'white',
    }),
  },
}));
