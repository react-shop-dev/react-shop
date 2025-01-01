import { isValidElement, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';

export type ProfileLayoutProps = {
  identity?: ReactNode;
  rightbar?: ReactNode;
  children: ReactNode;
};

export const ProfileLayout = (props: ProfileLayoutProps) => {
  const { identity, rightbar, children } = props;
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ md: rightbar ? 9 : 12, xs: 12 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>{identity}</CardContent>
          </Card>
        </Grid>
        {rightbar ? (
          <Grid size={{ md: 3, xs: 12 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>{rightbar}</CardContent>
            </Card>
          </Grid>
        ) : null}
      </Grid>
      {isValidElement(children) ? (
        <Card>
          <CardContent sx={{ containerType: 'inline-size' }}>{children}</CardContent>
        </Card>
      ) : null}
    </Box>
  );
};
