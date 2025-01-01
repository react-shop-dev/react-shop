import type { ReactNode } from 'react';
import { cloneElement, Children } from 'react';
import { isElement } from 'react-is';
import isObject from 'lodash/isObject';
import Container, { type ContainerProps } from '@mui/material/Container';
import MenuList, { type MenuListProps } from '@mui/material/MenuList';
import type { SxProps } from '@mui/material/styles';
import { MenuItem } from '../MenuItem';
import { StyledMenuClasses, StyledMenu } from './Menu.styles';

export interface MenuProps extends MenuListProps {
  children: ReactNode;
  container?: ContainerProps | boolean;
  sx?: SxProps;
}

export const Menu = (props: MenuProps) => {
  const { children, container = false, ...rest } = props;

  const renderMenuList = () => (
    <MenuList className={StyledMenuClasses.navigation} {...rest}>
      {Children.map(children, child =>
        isElement(child) ? cloneElement(child, { isRoot: true }) : null,
      )}
    </MenuList>
  );

  return (
    <StyledMenu>
      {container !== false ? (
        <Container {...(isObject(container) ? { ...container } : {})}>{renderMenuList()}</Container>
      ) : (
        renderMenuList()
      )}
    </StyledMenu>
  );
};

Menu.Item = MenuItem;
