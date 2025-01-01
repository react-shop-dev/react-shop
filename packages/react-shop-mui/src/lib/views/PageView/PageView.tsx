'use client';
import type { ReactElement, ReactNode } from 'react';
import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import { useShopConfig } from 'react-shop';
import Container, { type ContainerProps } from '@mui/material/Container';
import type { SxProps } from '@mui/material/styles';
import { Breadcrumbs } from '../../widgets/Breadcrumbs';
import { Sidebar, type SidebarProps } from '../../layout/Sidebar/Sidebar';
import { FlexBox } from '@views/FlexBox';
import type { DrawerComponentProps } from 'src/lib/layout/Drawer';
import { StyledPageContent, StyledPageRoot } from './PageView.styles';

const Drawer = dynamic(() => import('src/lib/layout/Drawer/Drawer'));
const defaultBreadcrumbs = <Breadcrumbs />;

export const PageView = ({
  aside,
  drawer,
  breadcrumbs = defaultBreadcrumbs,
  toolbar,
  container,
  sx = {},
  children,
}: PageViewProps) => {
  const config = useShopConfig();

  const finalBreadcrumbs = config?.feature?.breadcrumbs ? breadcrumbs : null;

  return (
    <Fragment>
      <StyledPageRoot sx={sx}>
        <Container {...container}>
          {finalBreadcrumbs !== false ? finalBreadcrumbs : null}
          {toolbar}
          <FlexBox component="main">
            {aside ? (
              <Sidebar inDrawer={!drawer} sticky={aside.props?.sticky}>
                {aside}
              </Sidebar>
            ) : null}
            <StyledPageContent fullWidth={!aside}>{children}</StyledPageContent>
          </FlexBox>
        </Container>
      </StyledPageRoot>
      {drawer ? <Drawer>{drawer}</Drawer> : null}
    </Fragment>
  );
};

export interface PageViewProps {
  breadcrumbs?: ReactNode | false;
  aside?: ReactElement<SidebarProps>;
  toolbar?: ReactElement;
  children?: ReactNode;
  container?: ContainerProps;
  drawer?: ReactElement<DrawerComponentProps>;
  sx?: SxProps;
}
