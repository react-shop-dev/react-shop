import { ReactNode, Fragment, useState, ComponentType } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@mui/material/styles/styled';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { IconBoxButton } from '@common/IconBoxButton';
import type { SxProps } from '@mui/material/styles';

export type SearchBarMobileProps = {
  children: ReactNode;
  icon?: ComponentType<SvgIconProps>;
  sx?: SxProps;
};

export const SearchBarMobile = (props: SearchBarMobileProps) => {
  const { icon: Icon = SearchIcon, children } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const renderDrawer = () => (
    <StyledDrawerContent px={3} pt={5} pb={4}>
      <IconButton onClick={toggleOpen}>
        <ExpandLessIcon fontSize="medium" />
      </IconButton>
      {children}
    </StyledDrawerContent>
  );

  return (
    <Fragment>
      <StyledIconWrapper>
        <IconBoxButton sx={{ marginLeft: 'auto' }} onClick={toggleOpen}>
          <Icon color="inherit" />
        </IconBoxButton>
      </StyledIconWrapper>
      <Drawer variant="persistent" anchor="top" open={open}>
        {open ? (
          <ClickAwayListener onClickAway={handleClickAway}>{renderDrawer()}</ClickAwayListener>
        ) : (
          renderDrawer()
        )}
      </Drawer>
    </Fragment>
  );
};

const StyledIconWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

const StyledDrawerContent = styled(Box)({
  position: 'relative',
  '& .MuiIconButton-root': {
    position: 'absolute',
    top: 0,
    right: '16px',
  },
});
