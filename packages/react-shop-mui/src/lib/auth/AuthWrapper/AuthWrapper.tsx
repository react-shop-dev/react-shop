import type { ReactNode } from 'react';
import Card, { CardProps } from '@mui/material/Card';
import { AuthWrapperClasses, StyledAuthWrapper } from './AuthWrapper.styles';

export const AuthWrapper = ({ children, ...rest }: { children: ReactNode } & CardProps) => {
  return (
    <StyledAuthWrapper>
      <Card className={AuthWrapperClasses.card} {...rest}>
        {children}
      </Card>
    </StyledAuthWrapper>
  );
};
