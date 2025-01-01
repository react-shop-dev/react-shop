'use client';
import { isValidElement, MouseEvent, ReactElement, ReactNode, useState } from 'react';
import { useTranslate } from 'react-shop/translate';
import Menu, { type MenuProps } from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { PopoverOrigin } from '@mui/material/Popover';

export const ActionsButtonMenu = (props: ActionsButtonMenuProps) => {
  const {
    sx,
    title,
    icon,
    children,
    closeOnClick = true,
    anchorOrigin = defaultProps.anchorOrigin,
    transformOrigin = defaultProps.transformOrigin,
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const translate = useTranslate();

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderIcon = () => (
    <IconButton edge="end" onClick={handleOpenMenu} aria-haspopup="true" color="inherit">
      {isValidElement(icon) ? icon : null}
    </IconButton>
  );

  const handleClick = () => {
    closeOnClick && setAnchorEl(null);
  };

  return (
    <div>
      {typeof icon === 'function' ? (
        icon({ handleOpenMenu })
      ) : title ? (
        <Tooltip title={translate(title)}>{renderIcon()}</Tooltip>
      ) : (
        renderIcon()
      )}
      <Menu
        sx={sx}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClick={handleClick}
        onClose={handleCloseMenu}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        {...rest}
      >
        {children}
      </Menu>
    </div>
  );
};

const defaultProps = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  } as PopoverOrigin,
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  } as PopoverOrigin,
};

type MenuIcon = ({
  handleOpenMenu,
}: {
  handleOpenMenu: (event: MouseEvent<HTMLElement>) => void;
}) => ReactElement;

export interface ActionsButtonMenuProps extends Omit<MenuProps, 'open' | 'anchorEl'> {
  title?: string;
  icon: ReactElement | MenuIcon;
  children: ReactNode;
  closeOnClick?: boolean;
}
