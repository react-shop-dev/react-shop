import { useEffect, useState } from 'react';
import {
  useCartProvider,
  eventEmitter,
  usePrice,
  useCheckoutContext,
  useSaveContext,
} from 'react-shop';
import PaymentIcon from '@mui/icons-material/Payment';
import { SubmitButton, type SubmitButtonProps } from '../SubmitButton';

export type PaymentButtonProps = SubmitButtonProps & {
  type?: 'button' | 'submit';
  showTotal?: boolean;
  checkCardComplete?: boolean;
};

export const PaymentButton = (props: PaymentButtonProps) => {
  const { cart: { total = 0 } = {}, isFetching } = useCartProvider();

  const {
    disabled: disabledProp,
    showTotal = false,
    checkCardComplete = false,
    label = 'Place Order',
    ...rest
  } = props;

  const [cardComplete, setCardComplete] = useState<boolean>(!checkCardComplete);
  const saveContext = useSaveContext();
  const { readyToPay } = useCheckoutContext();
  const formatPrice = usePrice();

  useEffect(() => {
    eventEmitter.once('cardComplete', () => {
      setCardComplete(true);
    });
  }, []);

  const disabled = !readyToPay || !cardComplete || isFetching || disabledProp;
  const isProcessing = saveContext?.saving || !total;

  return (
    <SubmitButton
      fullWidth
      size="large"
      label={
        isProcessing ? 'Processing...' : `${label} ${showTotal ? `(${formatPrice(total)})` : ''}`
      }
      disabled={disabled}
      alignIcon="right"
      {...rest}
    >
      <PaymentIcon />
    </SubmitButton>
  );
};
