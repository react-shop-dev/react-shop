import { FlexBox } from 'react-shop-mui/FlexBox';
import { RatingField } from 'react-shop-mui/RatingField';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const CommentSkeleton = () => (
  <Box maxWidth={600} mb={4}>
    <FlexBox alignItems="center" gap={2} mb={2}>
      <Skeleton variant="circular" width={48} height={48} />
      <Box>
        <Skeleton variant="text" width="25ch" sx={{ fontSize: '16px' }} />
        <FlexBox alignItems="center" gap={1.25}>
          <RatingField size="small" readOnly value={undefined} />
          <Skeleton variant="rounded" width="100%" height={18} />
        </FlexBox>
      </Box>
    </FlexBox>
    <Skeleton variant="rounded" width="100%" height={20} sx={{ mb: 2 }} />
    <Skeleton variant="rounded" width="80%" height={20} />
  </Box>
);
