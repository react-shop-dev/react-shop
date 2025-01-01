import Skeleton from '@mui/material/Skeleton';

const PLACEHOLDER_COUNT = 4;

export const PaymentsPlaceholder = () =>
  [...Array(PLACEHOLDER_COUNT)].map((_, index) => (
    <Skeleton
      key={index}
      variant="rounded"
      animation="wave"
      width="100%"
      height={80}
      sx={{ mb: 3 }}
    />
  ));
