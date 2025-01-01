import type { ComponentType } from 'react';
import { useRedirect } from 'react-shop';
import { useTranslate } from 'react-shop/translate';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { Menu, type MenuProps } from 'src/lib/widgets/Menu';
import type { MenuItemProps } from 'src/lib/widgets/MenuItem';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Loader } from '@common/Loader';
import { CatalogMenuClasses, StyledCatalogMenu } from './CatalogMenu.styles';

export const CatalogMenu = <T extends MenuRecord[]>(props: CatalogMenuProps<T>) => {
  const {
    data = [],
    isLoading,
    sx,
    label,
    href,
    onClick,
    className,
    icon: Icon = WidgetsIcon,
    arrowDown,
    actionOpen = 'hover',
    menuProps = {},
    buttonProps = {},
    menuItemProps = {},
  } = props;

  const redirect = useRedirect();
  const translate = useTranslate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (href && actionOpen === 'hover') {
      redirect({ to: href });
    }
  };

  const renderMenu = (nodes: MenuRecord[]) =>
    nodes.map(({ id, name, href, icon: Icon = Spacer, children }) => (
      <Menu.Item
        key={id}
        label={name}
        leftIcon={<Icon />}
        {...(href ? { to: href } : {})}
        {...menuItemProps}
      >
        {Array.isArray(children) && children.length > 0 ? renderMenu(children) : null}
      </Menu.Item>
    ));

  const translatedLabel = label ? translate(label, { _: label }) : undefined;

  return (
    <StyledCatalogMenu sx={sx}>
      <Menu className={clsx(className, CatalogMenuClasses.menu)} disablePadding {...menuProps}>
        <Menu.Item
          label={translatedLabel}
          actionOpen={actionOpen}
          onClick={handleClick}
          arrowDown={arrowDown !== false ? arrowDown : Noop}
          leftIcon={<Icon fontSize="large" className={CatalogMenuClasses.icon} />}
          className={CatalogMenuClasses.button}
          aria-label="Catalog menu"
          {...buttonProps}
        >
          {isLoading ? <Menu.Item leftIcon={<Loader />} /> : renderMenu(data)}
        </Menu.Item>
      </Menu>
    </StyledCatalogMenu>
  );
};

type MenuRecord = {
  id: string | number;
  name: string;
  href?: string;
  icon?: ComponentType<SvgIconProps>;
  children?: Array<MenuRecord>;
};

export interface CatalogMenuProps<Data extends MenuRecord[]> {
  data?: Data;
  isLoading?: boolean;
  sx?: SxProps;
  label?: string;
  href?: string;
  onClick?: () => void;
  actionOpen?: 'hover' | 'toggle';
  className?: string;
  menuProps?: MenuProps;
  menuItemProps?: MenuItemProps;
  buttonProps?: MenuItemProps;
  icon?: ComponentType<SvgIconProps>;
  arrowDown?: ComponentType<SvgIconProps> | false;
}

const Noop = () => null;
const Spacer = () => <Box />;
