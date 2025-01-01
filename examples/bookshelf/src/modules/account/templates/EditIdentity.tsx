'use client';

import { TextInput } from 'react-shop-mui/TextInput';
import { ProfilePassword } from '../components/ProfilePassword';
import { StyledIdentity } from '../components/StyledIdentity';

export const EditIdentity = () => {
  return (
    <StyledIdentity flexWrap="wrap">
      <TextInput label="First Name" source="first_name" />
      <TextInput label="Last Name" source="last_name" />
      <ProfilePassword />
    </StyledIdentity>
  );
};
