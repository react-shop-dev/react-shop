import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const AccountListPlaceholder = ({ count = 3 }: { count?: number }) => {
  return (
    <Box sx={{ mb: 4 }}>
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          animation="wave"
          width="100%"
          height={100}
          sx={{ mb: 4 }}
        />
      ))}
    </Box>
  );
};
