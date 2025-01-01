import { forwardRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { NextMuiLink, NextMuiLinkProps } from '../NextMuiLink';

export type NavLinkProps = NextMuiLinkProps & { exact?: boolean };

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
  const { href, exact, ...rest } = props;

  const pathname = usePathname();

  const isActive = useMemo(() => {
    const hrefProp = (typeof href === 'string' ? href : href.pathname) || '';

    if (hrefProp?.startsWith('http') || hrefProp?.startsWith('https')) {
      return false;
    }
    const hrefPathname = getPathname(hrefProp);

    if (activeRouteRegex.test(pathname)) {
      return trimPathname(pathname) === hrefPathname;
    }
    if (hrefPathname === '/' || exact) {
      return pathname === hrefPathname;
    }
    return pathname.startsWith(String(hrefPathname));
  }, [pathname, href, exact]);

  return <NextMuiLink ref={ref} href={href} isActive={isActive} {...rest} />;
});

NavLink.displayName = 'NavLink';

const activeRouteRegex = /\/([^/]+\/){2,}[^/]*\/?$/;

const getPathname = (url: string): string => {
  const { pathname } = new URL(url, 'https://reactshop.dev');
  return pathname;
};

const trimPathname = (pathname: string) => {
  const lastSlashIndex = pathname.lastIndexOf('/');
  let trimmedPathname = pathname.substring(0, lastSlashIndex + 1);
  if (trimmedPathname.endsWith('/')) {
    trimmedPathname = trimmedPathname.slice(0, -1);
  }
  return trimmedPathname;
};
