import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';

export type AuthTabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
  sx?: SxProps;
};

export const AuthTabPanel = (props: AuthTabPanelProps) => {
  const { children, value, index, sx = {}, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby="simple-tab"
      {...other}
    >
      {value === index ? <StyledAuthTabPanel sx={sx}>{children}</StyledAuthTabPanel> : null}
    </div>
  );
};

const StyledAuthTabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));
