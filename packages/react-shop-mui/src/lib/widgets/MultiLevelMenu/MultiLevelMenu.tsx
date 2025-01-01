import type { ComponentType, ReactNode } from 'react';
import {
  usePopupState,
  bindHover,
  bindMenu,
  bindToggle,
  PopupState,
} from 'material-ui-popup-state/hooks';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import MuiMenu, { type MenuProps } from '@mui/material/Menu';
import Box from '@mui/material/Box';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import DefaultArrowRight from '@mui/icons-material/ArrowRight';
import { MenuItemWithIcon } from '../MenuItem';
import styled from '@mui/material/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PopoverOrigin } from '@mui/material/Popover';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { Theme } from '@mui/material/styles/createTheme';

export interface MultilevelMenuProps {
  menuProps?: Omit<MenuProps, 'open'>;
  usePopupProps?: PopupState;
  actionOpen?: 'hover' | 'toggle';
  isRoot?: boolean;
  arrowDown?: ComponentType<SvgIconProps>;
  arrowRight?: ComponentType<SvgIconProps>;
  handleAnchorOrigin?: (isRoot: boolean) => PopoverOrigin;
  children?: ReactNode;
  label?: string;
  transformOrigin?: PopoverOrigin;
}

export const MultilevelMenu = (props: MultilevelMenuProps) => {
  const isMediaMatch = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  const {
    isRoot,
    label,
    children,
    menuProps,
    usePopupProps,
    actionOpen = isMediaMatch ? 'toggle' : 'hover',
    handleAnchorOrigin,
    transformOrigin = defaultTransformOrigin,
    arrowDown: ArrowDown = KeyboardArrowDown,
    arrowRight: ArrowRight = DefaultArrowRight,
    ...rest
  } = props;

  const { onMouseLeave, ...popupState } = usePopupState({
    variant: 'popover',
    ...usePopupProps,
  });

  const bindAction = isRoot && actionOpen === 'toggle' ? bindToggle : bindHover;
  const Menu = isRoot && actionOpen === 'toggle' ? MuiMenu : HoverMenu;

  const renderRightIcon = () =>
    isRoot ? (
      <ArrowDown className={MultilevelMenuClasses.arrowDown} />
    ) : (
      <ArrowRight fontSize="small" />
    );

  const anchorOrigin = handleAnchorOrigin
    ? handleAnchorOrigin(Boolean(isRoot))
    : isRoot
      ? rootAnchorOrigin
      : nestedAnchorOrigin;

  return (
    <StyledMultilevelMenu onMouseLeave={onMouseLeave}>
      <MenuItemWithIcon
        {...bindAction(popupState as PopupState)}
        rightIcon={renderRightIcon()}
        {...rest}
      >
        {label}
      </MenuItemWithIcon>
      <Menu
        {...bindMenu(popupState as PopupState)}
        elevation={3}
        anchorOrigin={anchorOrigin as PopoverOrigin}
        transformOrigin={transformOrigin}
        MenuListProps={{
          sx: {
            minWidth: 200,
            p: 1,
            my: 1,
          },
        }}
        {...menuProps}
      >
        {children}
      </Menu>
    </StyledMultilevelMenu>
  );
};

const rootAnchorOrigin = { vertical: 'bottom', horizontal: 'left' };
const nestedAnchorOrigin = { vertical: 'top', horizontal: 'right' };
const defaultTransformOrigin = { vertical: 'top', horizontal: 'left' } as PopoverOrigin;

const PREFIX = 'ShopMultilevelMenu';

const MultilevelMenuClasses = {
  arrowDown: `${PREFIX}-arrowDown`,
};

const StyledMultilevelMenu = styled(Box, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  position: 'relative',
  [`& .${MultilevelMenuClasses.arrowDown}`]: {
    color: theme.palette.grey[500],
    fontSize: '1.4rem',
    marginLeft: theme.spacing(0.5),
  },
}));
