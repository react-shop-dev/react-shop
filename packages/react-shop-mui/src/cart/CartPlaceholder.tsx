import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid2';

const COLUMNS_COUNT = 5;

export const CartPlaceholder = ({ count = COLUMNS_COUNT }: { count?: number }) => {
  const columns = count * 2;

  return (
    <Grid container columns={columns} spacing={2} sx={{ mb: 2 }}>
      {[...Array(COLUMNS_COUNT)].map((_, index) => (
        <Grid key={index} size={{ xs: columns / COLUMNS_COUNT }}>
          <Skeleton variant="rectangular" animation="wave" width="100%" height={30} />
        </Grid>
      ))}
    </Grid>
  );
};
