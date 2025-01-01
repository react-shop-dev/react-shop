'use client';
import type { ComponentType } from 'react';
import { useFormStatus } from 'react-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, type ButtonProps } from '@button/Button';

type LogoutSubmitButtonProps = ButtonProps & {
  icon?: ComponentType<SvgIconProps>;
};

export type LogoutButtonProps = LogoutSubmitButtonProps & {
  action: () => Promise<void>;
};

const LogoutSubmitButton = (props: LogoutSubmitButtonProps) => {
  const { label = 'rs.auth.logout', icon: Icon = LogoutIcon, ...rest } = props;

  const { pending } = useFormStatus();

  return (
    <Button type="submit" label={label} {...rest}>
      {pending ? <CircularProgress size={24} thickness={3} /> : <Icon />}
    </Button>
  );
};

export const LogoutButton = (props: LogoutButtonProps) => {
  const { action, ...rest } = props;

  return (
    <form action={action}>
      <LogoutSubmitButton {...rest} />
    </form>
  );
};
