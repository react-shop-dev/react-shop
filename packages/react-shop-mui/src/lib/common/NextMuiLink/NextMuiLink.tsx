'use client';
import { forwardRef } from 'react';
import { NextLink, NextLinkProps } from 'react-shop';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import clsx from 'clsx';

export const NextMuiLink = forwardRef<HTMLAnchorElement, NextMuiLinkProps>((props, ref) => {
  const {
    className: classNameProp,
    href,
    activeClassName = 'active',
    role: _role, // Link don't have roles
    underline = 'none',
    isActive,
    ...rest
  } = props;

  const className = clsx(classNameProp, {
    [activeClassName]: isActive && activeClassName,
  });

  const isExternal =
    typeof href === 'string' &&
    (href.startsWith('http') || href.startsWith('https') || href.startsWith('mailto:'));

  if (isExternal) {
    return <MuiLink ref={ref} className={className} href={href} target="_blank" {...rest} />;
  }

  return (
    <MuiLink
      ref={ref}
      className={className}
      component={NextLink}
      underline={underline}
      href={href}
      {...rest}
    />
  );
});

NextMuiLink.displayName = 'NextMuiLink';

export type NextMuiLinkProps = NextLinkProps & {
  activeClassName?: string;
  isActive?: boolean;
} & Omit<MuiLinkProps, 'href'>;
