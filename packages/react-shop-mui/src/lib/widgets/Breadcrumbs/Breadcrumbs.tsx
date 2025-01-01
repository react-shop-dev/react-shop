'use client';
import type { ReactNode, ReactElement } from 'react';
import { cloneElement } from 'react';
import { usePathnames } from 'react-shop';
import { useTranslate } from 'react-shop/translate';
import { useSearchParams } from 'next/navigation';
import { type BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material/styles';
import { NextMuiLink } from '@common/NextMuiLink';
import { StyledBreadcrumbs, StyledBreadcrumbsClasses } from './Breadcrumbs.styles';

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  firstLabel?: string;
  lastLabel?: string;
  className?: string;
  skipLastPath?: boolean;
  children?: ReactNode;
  sx?: SxProps;
}

export const Breadcrumbs = ({
  className,
  sx,
  lastLabel,
  maxItems = 5,
  itemsBeforeCollapse = 2,
  firstLabel = 'pages.home',
  skipLastPath,
  separator = <NavigateNextIcon fontSize="small" />,
  children,
  ...rest
}: BreadcrumbsProps) => {
  const pathnames = usePathnames(skipLastPath);
  const translate = useTranslate();

  if (pathnames.length === 0 && !children) return null;

  return (
    <StyledBreadcrumbs
      className={className}
      sx={sx}
      aria-label="breadcrumb"
      maxItems={maxItems}
      itemsBeforeCollapse={itemsBeforeCollapse}
      separator={separator}
      {...rest}
    >
      {[
        <NextMuiLink
          key="home"
          href="/"
          className={StyledBreadcrumbsClasses.label}
          color="inherit"
          underline="hover"
        >
          <HomeIcon className={StyledBreadcrumbsClasses.icon} />
          {translate(firstLabel, { _: 'Home' })}
        </NextMuiLink>,
        children !== undefined
          ? children
          : pathnames.map(({ last, to, key = '' }, index) => {
              return (
                <BreadcrumbsItem
                  key={index}
                  to={!last ? to : undefined}
                  label={!last ? key : lastLabel || key}
                />
              );
            }),
      ]}
    </StyledBreadcrumbs>
  );
};

export type BreadcrumbItemProps = {
  to?: string;
  icon?: ReactElement;
  label: string;
  allowQueryParams?: boolean;
};

const BreadcrumbsItem = (props: BreadcrumbItemProps) => {
  const { to, label, icon, allowQueryParams = false } = props;

  const translate = useTranslate();
  const search = useSearchParams();

  const styledIcon = icon ? cloneElement(icon, { className: StyledBreadcrumbsClasses.icon }) : null;

  return typeof to === 'string' ? (
    <NextMuiLink
      color="inherit"
      href={`${to}${allowQueryParams ? search : ''}`}
      className={StyledBreadcrumbsClasses.label}
      underline="hover"
    >
      {styledIcon}
      {translate(`pages.${label}`, { _: label })}
    </NextMuiLink>
  ) : (
    <Typography color="inherit" className={StyledBreadcrumbsClasses.label}>
      {styledIcon}
      <span suppressHydrationWarning>{label ? translate(`pages.${label}`, { _: label }) : ''}</span>
    </Typography>
  );
};

Breadcrumbs.Item = BreadcrumbsItem;
