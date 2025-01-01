import type { PropsWithChildren } from 'react';
import { FieldTitle } from 'react-shop';
import Typography from '@mui/material/Typography';

export const ReviewFieldTitle = ({ children }: PropsWithChildren) => {
  return (
    <FieldTitle
      label={
        <Typography variant="body1" gutterBottom>
          {children}
        </Typography>
      }
    />
  );
};
