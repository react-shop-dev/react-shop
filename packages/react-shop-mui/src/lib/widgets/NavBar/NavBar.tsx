'use client';
import type { ElementType, ReactNode } from 'react';
import { useTranslate } from 'react-shop/translate';
import type { LinkProps } from 'next/link';
import Box, { type BoxProps } from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { NavLink } from '@common/NavLink';
import { StyledNavItemLinkClasses, StyledNavLink } from './NavBar.styles';

type Link = {
  to: string;
  title: string;
} & Omit<LinkProps, 'href'>;

export interface NavbarProps extends BoxProps {
  sx?: SxProps;
  component?: ElementType;
  children?: ReactNode;
}

export const Navbar = (props: NavbarProps) => {
  const { children, sx = {}, component = 'nav', ...rest } = props;

  return (
    <Box component={component} sx={sx} {...rest}>
      {children}
    </Box>
  );
};

const NavbarItem = ({ to, title, ...rest }: Link) => {
  const translate = useTranslate();

  return (
    <StyledNavLink
      href={to}
      component={NavLink}
      activeClassName={StyledNavItemLinkClasses.active}
      sx={{ py: 0 }}
      {...rest}
    >
      {translate(title)}
    </StyledNavLink>
  );
};

Navbar.Item = NavbarItem;
