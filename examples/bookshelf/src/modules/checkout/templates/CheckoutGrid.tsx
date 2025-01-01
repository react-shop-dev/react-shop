import type { PropsWithChildren, ReactNode } from 'react';
import Grid from '@mui/material/Grid2';

type CheckoutGridProps = PropsWithChildren & { summary?: ReactNode };

export const CheckoutGrid = ({ children, summary }: CheckoutGridProps) => {
  return (
    <Grid container columns={16} spacing={3}>
      <Grid order={{ xs: 1, md: 0 }} size={{ xs: 16, md: summary ? 10 : 16 }}>
        {children}
      </Grid>
      {summary ? (
        <Grid order={{ xs: 0, md: 1 }} size={{ xs: 16, md: 6 }}>
          {summary}
        </Grid>
      ) : null}
    </Grid>
  );
};
