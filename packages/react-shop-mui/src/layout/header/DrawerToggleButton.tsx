'use client';
import { useAtom, drawerState } from 'react-shop';
import MuiMenuIcon from '@mui/icons-material/Menu';
import { IconTooltipButton, type IconTooltipButtonProps } from '@button/IconTooltipButton';

export type DrawerToggleButtonProps = IconTooltipButtonProps;

export const DrawerToggleButton = (props: DrawerToggleButtonProps) => {
  const { label = 'rs.navigation.drawer', sx } = props;

  const [open, setOpen] = useAtom(drawerState);

  return (
    <IconTooltipButton
      label={label}
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 1, ...sx }}
      onClick={() => setOpen(!open)}
    >
      <MuiMenuIcon />
    </IconTooltipButton>
  );
};

DrawerToggleButton.displayName = 'DrawerToggleButton';
