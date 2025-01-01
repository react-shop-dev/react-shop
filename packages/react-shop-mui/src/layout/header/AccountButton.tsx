'use client';
import type { ReactNode } from 'react';
import { useAuthState } from 'react-shop';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { AccountMenu, AccountMenuProps } from './AccountMenu';
import { Loader } from '@common/Loader';
import { IconBoxButton } from '@common/IconBoxButton';
import { LoginButton } from '@auth/LoginButton';

export type AccountButtonProps = AccountMenuProps & {
  sx?: SxProps;
};

export const AccountButton = (props: AccountButtonProps) => {
  const { sx } = props;

  const { isPending, authenticated } = useAuthState();

  if (isPending) {
    return (
      <IconBoxButton>
        <Loader size={24} />
      </IconBoxButton>
    );
  }

  let content: ReactNode;

  if (authenticated) {
    content = <AccountMenu />;
  } else {
    content = <LoginButton iconOnly={true} />;
  }

  return <Box sx={sx}>{content}</Box>;
};
