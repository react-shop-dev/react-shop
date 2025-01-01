'use client';

import { useGetIdentity } from 'react-shop';
import { AccountAvatar } from 'react-shop-mui/AccountAvatar';
import Typography from '@mui/material/Typography';
import { StyledIdentity } from './StyledIdentity';

export const ProfileIdentity = () => {
  const { identity } = useGetIdentity();

  return (
    <StyledIdentity gap={2}>
      <AccountAvatar
        src={identity?.image}
        alt={identity?.name || 'Incognito'}
        sx={{ width: 60, height: 60 }}
      />
      <Typography component="h5" fontWeight={600} fontSize={18}>
        {identity?.name}
      </Typography>
    </StyledIdentity>
  );
};
