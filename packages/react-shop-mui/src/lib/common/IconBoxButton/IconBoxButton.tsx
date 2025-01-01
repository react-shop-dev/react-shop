import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { IconButtonProps } from '@mui/material/IconButton';
import { StyledIconButton } from './IconBoxButton.styles';

type IconBoxButtonProps = { children: ReactNode } & IconButtonProps;

export const IconBoxButton = forwardRef<HTMLButtonElement, IconBoxButtonProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <StyledIconButton ref={ref} color="inherit" {...rest}>
      {children}
    </StyledIconButton>
  );
});

IconBoxButton.displayName = 'IconBoxButton';
