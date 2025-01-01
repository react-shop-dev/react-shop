import { type ReactElement, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { SxProps } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles/createTheme';
import Card, { type CardProps } from '@mui/material/Card';
import { Drawer, type DrawerComponentProps } from '../Drawer/Drawer';
import { StyledSidebar } from './Sidebar.styles';

export type SidebarProps = {
  sx?: SxProps;
  inDrawer?: boolean;
  sticky?: boolean | number;
  children: ReactElement<{ cardProps?: CardProps } & DrawerComponentProps>;
};

export const Sidebar = ({ sx, sticky, inDrawer, children }: SidebarProps) => {
  const isMatchMedia = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  const showInDrawer = useMemo(() => inDrawer && children.props?.inDrawer, [inDrawer]);

  return (
    <>
      <StyledSidebar sticky={sticky} sx={sx}>
        <Card elevation={0} sx={{ bgcolor: 'inherit' }} {...(children.props?.cardProps || {})}>
          {children}
        </Card>
      </StyledSidebar>
      {isMatchMedia && showInDrawer ? <Drawer>{children}</Drawer> : null}
    </>
  );
};
