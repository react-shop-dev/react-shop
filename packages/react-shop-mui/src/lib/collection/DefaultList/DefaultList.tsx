import type { PropsWithChildren } from 'react';
import type { BoxProps } from '@mui/material/Box';
import { StyledDefaultList } from './DefaultList.styles';

export const DefaultListWrapper: React.FC = ({
  children,
  ...rest
}: BoxProps & PropsWithChildren) => <StyledDefaultList {...rest}>{children}</StyledDefaultList>;
