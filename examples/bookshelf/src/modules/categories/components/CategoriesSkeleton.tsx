import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

const CategoriesSkeleton = () => {
  return (
    <Grid container spacing={3}>
      {[...Array(12)].map((_, index) => (
        <Grid key={index} size={{ xl: 3, lg: 4, md: 4, sm: 6, xs: 12 }}>
          <Skeleton variant="rounded" animation="wave" width="100%" height={100} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoriesSkeleton;
