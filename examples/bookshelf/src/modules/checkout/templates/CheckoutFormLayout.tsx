import type { ReactElement, ReactNode } from 'react';
import { WithOptionalProperty } from 'react-shop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { StyledFormLayout } from '../../layout/FormLayout.styles';
import { CheckoutFormToolbarProps } from '../components/CheckoutFormToolbar';

export type CheckoutFormLayoutProps = {
  toolbar?: ReactElement;
  children?: ReactNode;
};

export type CheckoutFormElementProps = WithOptionalProperty<CheckoutFormToolbarProps, 'title'>;

const CheckoutFormLayout = ({ toolbar, children }: CheckoutFormLayoutProps) => {
  return (
    <Root>
      {toolbar}
      <StyledFormLayout sx={{ px: 3 }}>{children}</StyledFormLayout>
    </Root>
  );
};

const Root = ({ children }: { children: ReactNode }) => (
  <Card elevation={0} sx={{ mb: 4 }}>
    <CardContent>{children}</CardContent>
  </Card>
);

export default CheckoutFormLayout;
