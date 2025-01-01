import { FlexBox } from 'react-shop-mui/FlexBox';
import { ReferenceManyCount } from 'react-shop-mui/ReferenceManyCount';
import Typography from '@mui/material/Typography';
import { ACCOUNT_URL } from '@/lib/constants';

export const OrderCount = () => (
  <FlexBox alignItems="center" flexDirection="column">
    <ReferenceManyCount
      reference="orders"
      target="customer_id"
      link={`${ACCOUNT_URL}/orders`}
      color="primary"
      fontWeight={600}
      fontSize={18}
      gutterBottom
    />
    <Typography color="grey.600" fontSize={15}>
      All Orders
    </Typography>
  </FlexBox>
);
