import { alpha } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const scrollBarStyles = {
  '&::-webkit-scrollbar': {
    width: '6px',
    backgroundColor: 'inherit',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '8px',
    backgroundColor: alpha(grey[500], 0.5),
  },
};
