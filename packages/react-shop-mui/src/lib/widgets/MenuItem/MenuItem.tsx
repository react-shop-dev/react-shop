import type { ReactNode, ReactElement } from 'react';
import type { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';
import type { SxProps } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from '@common/NavLink';
import { MultilevelMenu, type MultilevelMenuProps } from '../MultiLevelMenu';
import { StyledMenuItem } from './StyledMenuItem.styles';

export interface MenuItemProps extends MuiMenuItemProps, MultilevelMenuProps {
  label?: string;
  to?: string;
  children?: ReactNode;
  leftIcon?: ReactElement;
  sx?: SxProps;
}

const MenuItemLink = ({ href, children, ...rest }: { href: string } & MuiMenuItemProps) => (
  <MenuItemWithIcon href={href} component={NavLink} {...rest}>
    {children}
  </MenuItemWithIcon>
);

export const MenuItem = (props: MenuItemProps) => {
  const { to, label, children, isRoot: _isRoot, ...rest } = props;

  return to ? (
    <MenuItemLink href={to} {...rest}>
      {label}
    </MenuItemLink>
  ) : children ? (
    <MultilevelMenu {...props} />
  ) : (
    <MenuItemWithIcon disableRipple {...rest}>
      {label}
    </MenuItemWithIcon>
  );
};

type MeniItemWithIconProps = {
  leftIcon?: ReactElement;
  rightIcon?: ReactNode;
  href?: string;
  children: ReactNode;
};

export const MenuItemWithIcon = ({
  leftIcon,
  rightIcon,
  children,
  ...rest
}: MeniItemWithIconProps) => (
  <StyledMenuItem {...rest}>
    {leftIcon ? <ListItemIcon>{leftIcon}</ListItemIcon> : null}
    <ListItemText>{children}</ListItemText>
    {rightIcon}
  </StyledMenuItem>
);
