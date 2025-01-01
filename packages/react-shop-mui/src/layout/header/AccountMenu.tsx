'use client';

import { type ReactElement } from 'react';
import { useTranslate, useGetIdentity, useSignOut, useShopConfig } from 'react-shop';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountIcon from '@mui/icons-material/ManageAccounts';
import { ActionsButtonMenu } from '@button/ActionsButtonMenu';
import { NextMuiLink } from '@common/NextMuiLink';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AccountAvatar } from '@picture/AccountAvatar';
import type { Theme } from '@mui/material/styles/createTheme';
import { LogoutMenuItem } from '@auth/LogoutMenuItem';
import { Loader } from '@common/Loader';

export type AccountMenuProps = {
  icon?: ReactElement;
};

const menu = [{ name: 'rs.auth.account', icon: AccountIcon }];

export const AccountMenu = (props: AccountMenuProps) => {
  const { icon } = props;

  const { identity } = useGetIdentity();
  const config = useShopConfig();
  const translate = useTranslate();
  const { isPending } = useSignOut();

  const isMediaMatch = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  return (
    <ActionsButtonMenu
      id="account-menu"
      keepMounted
      {...(isMediaMatch ? { transformOrigin: { vertical: 'bottom', horizontal: 'right' } } : {})}
      sx={{
        mt: '45px',
      }}
      icon={({ handleOpenMenu }) => (
        <IconButton
          color="primary"
          aria-label="Account menu"
          size="small"
          aria-controls="simple-menu"
          onClick={handleOpenMenu}
        >
          {isPending ? (
            <Loader size={24} />
          ) : (
            <AccountAvatar
              src={identity?.image}
              alt={identity?.name || 'Incognito'}
              sx={{ width: 38, height: 38 }}
            >
              {identity?.name || icon}
            </AccountAvatar>
          )}
        </IconButton>
      )}
    >
      {menu.map(({ name, icon: Icon }) => (
        <MenuItem key={name} href={config?.auth?.accountUrl} component={NextMuiLink}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText>{translate(name, { name })}</ListItemText>
        </MenuItem>
      ))}
      <LogoutMenuItem />
    </ActionsButtonMenu>
  );
};
