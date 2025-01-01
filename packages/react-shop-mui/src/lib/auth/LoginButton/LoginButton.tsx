'use client';
import type { ComponentType } from 'react';
import { authPopupState, useSetAtom } from 'react-shop';
import { useRouter } from 'next/navigation';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { IconBoxButton } from '@common/IconBoxButton';
import PersonIcon from '@icons/Person';
import { IconTooltipButton } from '@button/IconTooltipButton';
import { Button, type ButtonProps } from '@button/Button';

export type LoginButtonProps = ButtonProps & {
  label?: string;
  iconOnly?: boolean;
  loginUrl?: string;
  icon?: ComponentType<SvgIconProps>;
};

export const LoginButton = ({
  label = 'rs.auth.login',
  loginUrl,
  iconOnly,
  icon: Icon = PersonIcon,
  ...rest
}: LoginButtonProps) => {
  const router = useRouter();
  const setOpen = useSetAtom(authPopupState);

  const onLogin = () => {
    if (loginUrl) {
      router.push('/login');
    } else {
      setOpen(true);
    }
  };

  if (iconOnly) {
    return (
      <IconTooltipButton label={label} component={IconBoxButton} onClick={onLogin}>
        <Icon />
      </IconTooltipButton>
    );
  }

  return (
    <Button label={label} onClick={onLogin} {...rest}>
      <Icon />
    </Button>
  );
};
