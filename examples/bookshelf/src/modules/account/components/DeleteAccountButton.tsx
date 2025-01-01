'use client';

import { Fragment } from 'react';
import { useSignOut } from 'react-shop';
import { DeleteButtonConfirm } from 'react-shop-mui/DeleteButtonConfirm';
import Typography from '@mui/material/Typography';
import { STORAGE_USER_PREFIX } from '@/lib/constants';

export const DeleteAccountButton = () => {
  const { logout } = useSignOut();

  return (
    <DeleteButtonConfirm
      resource={STORAGE_USER_PREFIX}
      label="Delete account"
      buttonIcon={false}
      dialogTitle="Delete account"
      redirect={{ to: '/' }}
      mutationOptions={{
        onSuccess: () => {
          logout(false);
        },
      }}
      ButtonProps={{
        variant: 'text',
      }}
      confirmMessage={
        <Fragment>
          <Typography fontWeight="bold">
            Are you sure you want to delete your account? This action is permanent and cannot be
            undone
          </Typography>
          <Typography>
            - You will lose access to your purchase history and order tracking.
          </Typography>
          <Typography>
            - All saved payment methods, addresses, and preferences will be erased.
          </Typography>
        </Fragment>
      }
    />
  );
};
