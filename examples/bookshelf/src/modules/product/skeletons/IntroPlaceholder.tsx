import { FlexBox } from 'react-shop-mui/FlexBox';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export const IntroPlaceholder = () => {
  return (
    <FlexBox flexDirection="column" alignItems="flex-start" gap={1}>
      <Skeleton
        variant="rounded"
        animation="wave"
        height={24}
        width={40}
        sx={{ borderRadius: 2 }}
      />
      <Typography component="div" variant="h4" width="80%">
        <Skeleton animation="wave" />
      </Typography>
      <FlexBox gap={1} sx={{ my: 1 }}>
        <Skeleton variant="circular" width={24} height={24} animation="wave" />
        <Skeleton variant="circular" width={24} height={24} animation="wave" />
        <Skeleton variant="circular" width={24} height={24} animation="wave" />
        <Skeleton variant="circular" width={24} height={24} animation="wave" />
        <Skeleton variant="circular" width={24} height={24} animation="wave" />
      </FlexBox>
      <Typography component="div" variant="h6" width="33%">
        <Skeleton animation="wave" />
      </Typography>
      <Typography component="div" variant="h6" width="33%">
        <Skeleton animation="wave" />
      </Typography>
      <Typography component="div" variant="h6" width="33%">
        <Skeleton animation="wave" />
      </Typography>
      <FlexBox gap={1.5} sx={{ my: 1.5 }}>
        <Skeleton
          variant="rounded"
          width={80}
          height={32}
          animation="wave"
          sx={{ borderRadius: 2 }}
        />
        <Skeleton
          variant="rounded"
          width={80}
          height={32}
          animation="wave"
          sx={{ borderRadius: 2 }}
        />
        <Skeleton
          variant="rounded"
          width={80}
          height={32}
          animation="wave"
          sx={{ borderRadius: 2 }}
        />
      </FlexBox>
      <Skeleton sx={{ fontSize: '1.4rem' }} width="25%" animation="wave" />
      <Skeleton sx={{ fontSize: '1.6rem' }} width="25%" animation="wave" />
      <Skeleton width="100%" animation="wave" />
      <Box sx={{ my: 4 }}>
        <Skeleton variant="rectangular" animation="wave" width={160} height={42} />
      </Box>
    </FlexBox>
  );
};
