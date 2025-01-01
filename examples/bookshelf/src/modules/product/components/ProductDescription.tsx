import { Fragment } from 'react';
import Typography from '@mui/material/Typography';

export const ProductDescription = ({ value }: { value?: string | null }) => {
  return value ? (
    <Fragment>
      <Typography fontWeight={600} sx={{ textWrap: 'balance' }}>
        Description:
      </Typography>
      <Typography color="grey.600">{value}</Typography>
    </Fragment>
  ) : null;
};
