'use client';
import { createElement, ReactNode } from 'react';
import isString from 'lodash/isString';
import { useTranslate } from 'react-shop/translate';
import { TreeItem, treeItemClasses, TreeItemContentProps } from '@mui/x-tree-view/TreeItem';
import { alpha } from '@mui/material/styles';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { MenuItemContent as DefaultMenuItemContent } from './MenuItemContent';
import { TransitionMenuItem } from './TransitionMenuItem';
import { NavLink, type NavLinkProps } from '@common/NavLink';
import { COLOR_SCHEME_DARK } from 'src/theme/constants';

export const StyledTreeItem = (
  props: Omit<TreeItemContentProps, 'onFocus'> & {
    labelIcon?: React.ElementType<SvgIconProps> | false;
    expandable: boolean;
    title: string;
    href?: NavLinkProps['href'];
    exact?: NavLinkProps['exact'];
  },
) => {
  const {
    itemId,
    title,
    classes,
    expandable,
    labelIcon,
    exact = true,
    href: hrefProp,
    ...other
  } = props;

  const translate = useTranslate();

  const renderIcon = () =>
    labelIcon ? (
      // show custom icon
      <Box color="inherit" className={classes.iconContainer}>
        {createElement(labelIcon)}
      </Box>
    ) : !expandable && labelIcon !== false ? (
      // add spacer
      <div className={classes.iconContainer} />
    ) : null;

  const finalTitle = isString(title) ? translate(title, { _: title }) : title;
  const href = isString(hrefProp) ? hrefProp : `/${(title || '')?.toLowerCase()}`;

  const LabelContent = ({ children }: { children: ReactNode }) =>
    expandable ? (
      <>{children}</>
    ) : (
      <NavLink color="inherit" exact={exact} href={href ?? '#'}>
        {children}
      </NavLink>
    );

  return (
    <StyledTreeItemRoot
      itemId={itemId}
      className={classes.root}
      ContentComponent={DefaultMenuItemContent}
      slots={{ groupTransition: TransitionMenuItem }}
      label={
        <LabelContent>
          {renderIcon()}
          <Typography component="span" fontSize="inherit" color="inherit">
            {finalTitle}
          </Typography>
        </LabelContent>
      }
      {...other}
    />
  );
};

const PREFIX = 'ShopTreeItem';

const StyledTreeItemRoot = styled(TreeItem, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})<{ theme?: Theme }>(({ theme }) => ({
  marginBottom: theme.spacing(1),
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.grey[700],
    ...theme.applyStyles(COLOR_SCHEME_DARK, {
      color: theme.palette.grey[500],
    }),
    padding: `0 ${theme.spacing(1.2)}`,
    borderRadius: theme.spacing(1),
    cursor: 'default',
    ':has(a.active)': {
      backgroundColor: alpha(theme.palette.primary.dark, theme.palette.action.selectedOpacity),
    },
    '&:hover:not(:has(a.active))': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.action.hover,
      ...theme.applyStyles(COLOR_SCHEME_DARK, {
        backgroundColor: theme.palette.grey[900],
      }),
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      marginRight: theme.spacing(1.8),
      '> svg': {
        width: '1.3rem',
        height: '1.3rem',
      },
    },
    [`& .${treeItemClasses.label}`]: {
      display: 'flex',
      alignItems: 'center',
      textTransform: 'capitalize',
      flexGrow: 1,
      fontWeight: 400,
      letterSpacing: 1,
      minHeight: theme.spacing(4.5),
      fontSize: theme.typography.htmlFontSize,
      wordBreak: 'break-word',
      ['& > a']: {
        display: 'flex',
        alignItems: 'center',
        width: 'inherit',
        padding: `${theme.spacing(0.75)} 0`,
      },
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(1),
    },
  },
}));

StyledTreeItem.displayName = 'MenuItem';
