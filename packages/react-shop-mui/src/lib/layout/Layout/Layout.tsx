'use client';
import { ReactNode, ComponentType, Fragment, ReactElement, isValidElement } from 'react';
import { isValidElementType } from 'react-is';
import dynamic from 'next/dynamic';
import type { SxProps } from '@mui/material/styles';
import { TopBar as DefaultTopBar } from '../TopBar';
import { Header as DefaultHeader, HeaderProps } from '../Header';
import { Footer as DefaultFooter, FooterProps } from 'src/layout/footer/Footer';
import type { CartProps } from 'src/cart/Cart';
import { ScrollTop as DefaultScrollTop, ScrollTopProps } from 'src/layout/ScrollTop';
import type { AuthBaseProps } from 'src/auth/AuthBase';
import type { CookiesBarProps } from '../../widgets/CookiesBar/CookiesBar';
import { StyledLayoutClasses, StyledLayout } from './Layout.styles';

const Cart = dynamic(() => import('src/cart/Cart'));
const AuthDialog = dynamic(() => import('src/auth/AuthDialog'));
const DefaultCookiesBar = dynamic(() => import('../../widgets/CookiesBar'));

const defaultTopBar = <DefaultTopBar />;

export const Layout = (props: LayoutProps) => {
  const {
    sx,
    topBar = defaultTopBar,
    header = DefaultHeader,
    menu,
    auth,
    cart,
    scrollTop: ScrollTop = DefaultScrollTop,
    cookieBar: CookiesBar = DefaultCookiesBar,
    footer = DefaultFooter,
    children,
  } = props;

  return (
    <Fragment>
      <StyledLayout sx={sx}>
        {topBar}
        {getElement(header)}
        {menu}
        <div className={StyledLayoutClasses.holder}>{children}</div>
        {getElement(footer)}
        <ScrollTop />
      </StyledLayout>
      <CookiesBar />
      {auth !== false ? <AuthDialog>{auth}</AuthDialog> : null}
      {cart !== false ? <Cart dialog={cart?.props.dialog}>{cart}</Cart> : null}
    </Fragment>
  );
};

export type LayoutProps = {
  children?: ReactNode;
  sx?: SxProps;
  topBar?: ReactNode;
  header?: ComponentType<HeaderProps> | ReactElement;
  menu?: ReactNode;
  footer?: ComponentType<FooterProps> | ReactElement;
  scrollTop?: ComponentType<ScrollTopProps>;
  cookieBar?: ComponentType<CookiesBarProps>;
  cart?: ReactElement<CartProps> | false;
  auth?: ReactElement<AuthBaseProps> | false;
};

const getElement = (ElementOrComponent: ComponentType<any> | ReactElement) => {
  if (isValidElement(ElementOrComponent)) {
    return ElementOrComponent;
  }
  if (isValidElementType(ElementOrComponent)) {
    const Element = ElementOrComponent as ComponentType<any>;
    return <Element />;
  }
  return null;
};
