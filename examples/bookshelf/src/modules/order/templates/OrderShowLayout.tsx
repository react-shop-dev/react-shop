import { isValidElement, Children, type ReactNode, Fragment } from 'react';
import { FlexBox } from 'react-shop-mui/FlexBox';
import type { Identifier } from 'react-shop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { OrderShowTitle } from '../components/OrderShowTitle';

type OrderShowLayoutProps = {
  id?: Identifier;
  title?: string;
  topbar?: ReactNode;
  items?: ReactNode;
  children: ReactNode;
};

export const OrderShowLayout = ({ id, title, topbar, items, children }: OrderShowLayoutProps) => (
  <Fragment>
    <OrderShowTitle id={id} title={title} />
    <FlexBox gap={2} flexDirection="column">
      {topbar}
      {items ? (
        <Card>
          <CardContent sx={{ containerType: 'inline-size' }}>{items}</CardContent>
        </Card>
      ) : null}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Children.map(children, child =>
          isValidElement(child) ? (
            <Grid size={{ lg: 6, xs: 12 }}>
              <Card>
                <CardContent>{child}</CardContent>
              </Card>
            </Grid>
          ) : null,
        )}
      </Grid>
    </FlexBox>
  </Fragment>
);
