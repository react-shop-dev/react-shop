'use client';

import { useRecordContext } from 'react-shop';
import type { Customer } from 'react-shop-types';
import { format as formatDate } from 'date-fns';
import { ProfileField } from '../components/ProfileField';
import { StyledProfileInfo } from './ProfileInfo.styles';

export const ProfileInfo = () => {
  const customer = useRecordContext<Customer>();

  return (
    <StyledProfileInfo>
      <ProfileField label="Email">{customer?.email}</ProfileField>
      <ProfileField label="Phone">{customer?.phone}</ProfileField>
      <ProfileField label="Birth date">
        {customer?.date_of_birth ? (
          <time>{formatDate(customer.date_of_birth, 'dd MMM, yyyy')}</time>
        ) : null}
      </ProfileField>
    </StyledProfileInfo>
  );
};
