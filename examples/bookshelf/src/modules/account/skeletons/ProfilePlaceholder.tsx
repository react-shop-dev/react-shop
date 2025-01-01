import { FlexBox } from 'react-shop-mui/FlexBox';
import Skeleton from '@mui/material/Skeleton';
import { StyledProfileInfo } from '../templates/ProfileInfo.styles';
import { ProfileLayout } from '../templates/ProfileLayout';

export const ProfilePlaceholder = () => (
  <ProfileLayout
    identity={
      <FlexBox alignItems="center" gap={2}>
        <Skeleton variant="circular" width={60} height={60} />
        <Skeleton variant="text" sx={{ fontSize: '18px' }} width="15ch" />
      </FlexBox>
    }
    rightbar={
      <FlexBox alignItems="center" flexDirection="column">
        <Skeleton variant="circular" width={28} height={28} />
        <Skeleton variant="text" sx={{ fontSize: '15px' }} width="10ch" />
      </FlexBox>
    }
  >
    <StyledProfileInfo>
      <Skeleton variant="rectangular" animation="wave" width="20%" height={24} />
      <Skeleton variant="rectangular" animation="wave" width="20%" height={24} />
      <Skeleton variant="rectangular" animation="wave" width="20%" height={24} />
    </StyledProfileInfo>
  </ProfileLayout>
);
