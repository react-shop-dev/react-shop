import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';

export const StyledProductTitle = styled(Typography)(({ theme }) => ({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  marginBottom: '4px',
  lineHeight: '1.4',
  fontWeight: 600,
  fontSize: 'inherit',
  WebkitBoxOrient: 'vertical',
  '&:has(a)': {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
})) as typeof Typography;
