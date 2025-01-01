'use client';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, Fragment } from 'react';
import { drawerState, useAtom } from 'react-shop';
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';
import type { SxProps } from '@mui/material/styles';
import { DrawerToggleButton } from 'src/layout/header/DrawerToggleButton';
import { ShopButton } from 'src/layout/header/ShopButton';
import { StyledDrawerClasses, StyledDrawer } from './Drawer.styles';

export type DrawerComponentProps = {
  closeIcon?: ReactNode;
  inDrawer?: boolean;
  sx?: SxProps;
};

export type DrawerProps = MuiDrawerProps & {
  children: ReactElement<DrawerComponentProps>;
};

export const Drawer = (props: DrawerProps) => {
  const { children, className, ...rest } = props;

  const [open, setOpen] = useAtom(drawerState);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    return () => setOpen(false);
  }, []);

  return (
    <Fragment>
      <ShopButton element={<DrawerToggleButton />} />
      <MuiDrawer open={open} onClose={handleClose} sx={{ width: open ? 'auto' : 0 }} {...rest}>
        <StyledDrawer py={5} className={className} sx={children?.props?.sx}>
          <IconButton onClick={handleClose} className={StyledDrawerClasses.closeIcon}>
            {children?.props?.closeIcon || <Clear fontSize="medium" />}
          </IconButton>
          <Box px={2} className={StyledDrawerClasses.content}>
            {children}
          </Box>
        </StyledDrawer>
      </MuiDrawer>
    </Fragment>
  );
};

export default Drawer;
