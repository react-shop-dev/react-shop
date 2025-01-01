'use client';

import { ReactElement, useCallback, isValidElement } from 'react';
import { useTranslate, useSignOut, useAuthState } from 'react-shop';
import isFunction from 'lodash/isFunction';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';

export type LogoutMenuItemProps = {
  icon?: ReactElement;
  className?: string;
  redirectTo?: string;
  onClick?: () => void;
};

export const LogoutMenuItem = (props: LogoutMenuItemProps) => {
  const { icon, className, redirectTo, onClick, ...rest } = props;

  const { authenticated } = useAuthState();
  const { logout } = useSignOut();
  const translate = useTranslate();

  const handleClick = useCallback(() => {
    if (isFunction(onClick)) {
      onClick();
    }
    logout(redirectTo);
  }, [logout, redirectTo, onClick]);

  if (!authenticated) {
    return null;
  }

  return (
    <MenuItem onClick={handleClick} className={className} {...rest}>
      <ListItemIcon>{isValidElement(icon) ? icon : <LogoutIcon color="secondary" />}</ListItemIcon>
      <ListItemText>{translate('rs.auth.logout', { _: 'Logout' })}</ListItemText>
    </MenuItem>
  );
};
