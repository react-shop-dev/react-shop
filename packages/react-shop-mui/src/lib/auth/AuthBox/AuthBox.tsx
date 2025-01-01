import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { AuthBoxTitle } from '../AuthBoxTitle';
import { AuthHeader, type AuthFormHeaderProps } from '../AuthHeader';
import { AuthWrapper } from '../AuthWrapper';

export type AuthBoxProps = AuthFormHeaderProps & {
  title?: string;
  holderStyles?: SxProps;
  children: ReactNode;
  headerStyles?: SxProps;
};

export const AuthBox = (props: AuthBoxProps) => {
  const { title, children, logo, sx, holderStyles, headerStyles, ...rest } = props;

  return (
    <AuthWrapper sx={{ p: 1, ...sx }} {...rest}>
      <AuthHeader logo={logo} sx={headerStyles} />
      {title ? (
        <Box display="flex" justifyContent="center">
          <AuthBoxTitle title={title} />
        </Box>
      ) : null}
      <Box sx={holderStyles}>{children}</Box>
    </AuthWrapper>
  );
};
