import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import { FlexBox } from '@views/FlexBox';

export const AuthPlaceholder = () => (
  <FlexBox flexDirection="column" gap={2}>
    <FlexBox justifyContent="center" gap={1} sx={{ my: 2 }}>
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '20px' }} width="10ch" />
      <Skeleton animation="wave" variant="text" sx={{ fontSize: '20px' }} width="10ch" />
    </FlexBox>
    <Skeleton variant="rectangular" animation="wave" width="100%" height={30} />
    <Skeleton variant="rectangular" animation="wave" width="100%" height={30} />
    <Divider />
    <Skeleton variant="rectangular" animation="wave" width="100%" height={32} />
    <Skeleton variant="rectangular" animation="wave" width="100%" height={32} />
  </FlexBox>
);
