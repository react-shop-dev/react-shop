import type { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const AddReviewLayout = ({ title, children }: { title: string } & PropsWithChildren) => {
  return (
    <Box sx={{ my: 5 }}>
      <Typography component="h2" fontWeight="600" fontSize={20} sx={{ mb: 3 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
