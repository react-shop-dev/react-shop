import Card, { type CardProps } from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export const NoResults = (props: CardProps) => {
  return (
    <Card sx={{ height: '-webkit-fill-available', p: 3, textAlign: 'center' }} {...props}>
      <Typography variant="body1">No results found</Typography>
    </Card>
  );
};
