import { usePrice } from 'react-shop';
import { FlexBox } from 'react-shop-mui/FlexBox';
import Typography from '@mui/material/Typography';

const DeliveryItem = (props: any) => {
  const formatPrice = usePrice();

  return (
    <FlexBox justifyContent="space-between" gap={2} sx={{ width: 'fill-available' }}>
      <Typography>{props.name}</Typography>
      <Typography color="grey.600">{formatPrice(props.price_incl_tax)}</Typography>
    </FlexBox>
  );
};

export default DeliveryItem;
