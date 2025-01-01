import Skeleton from '@mui/material/Skeleton';
import { InputHolder } from '../../common/InputHolder';
import { CheckoutFormToolbar } from '../components/CheckoutFormToolbar';
import CheckoutFormLayout, { type CheckoutFormElementProps } from '../templates/CheckoutFormLayout';

const DeliveryPlaceholder = (props: CheckoutFormElementProps) => {
  return (
    <CheckoutFormLayout toolbar={<CheckoutFormToolbar title="Loading..." {...props} />}>
      <InputHolder>
        <Skeleton variant="rounded" width="100%" height={42} sx={{ my: 1 }} />
        <Skeleton variant="rounded" width="100%" height={42} sx={{ my: 1 }} />
      </InputHolder>
    </CheckoutFormLayout>
  );
};

export default DeliveryPlaceholder;
