import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

export const ServicesLoading = () => (
  <Grid container spacing={3} sx={{ my: 2 }}>
    {Array.from(Array(3).keys()).map(index => (
      <Grid key={index} size={{ lg: 4, sm: 12, xs: 12 }}>
        <Skeleton animation="wave" height={170} sx={{ borderRadius: '8px' }} />
      </Grid>
    ))}
  </Grid>
);
