import type { ComponentType } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { SxProps } from '@mui/material/styles';
import { IconTooltipButton } from '@button/IconTooltipButton';
import { AuthWrapperClasses } from '@auth/AuthWrapper/AuthWrapper.styles';

export type AuthFormHeaderProps = {
  showBackIcon?: boolean;
  handleClick?: () => void;
  logo?: ComponentType<SvgIconProps | any>;
  sx?: SxProps;
};

export const AuthHeader = ({
  showBackIcon,
  handleClick,
  logo: Icon = LockIcon,
}: AuthFormHeaderProps) => {
  return (
    <Box className={AuthWrapperClasses.topBar}>
      {showBackIcon ? (
        <IconTooltipButton
          label="Go to Sign In"
          className={AuthWrapperClasses.backArrow}
          onClick={handleClick}
        >
          <ArrowBackIcon />
        </IconTooltipButton>
      ) : null}
      <Avatar sx={{ backgroundColor: 'info.main' }}>
        <Icon />
      </Avatar>
    </Box>
  );
};
