import { useInput } from 'react-shop';
import type { TextInputProps } from 'react-shop-mui/TextInput';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Box from '@mui/material/Box';
import { SvgIcon } from '@/modules/common/SvgIcon';

export const PaymentMethodImage = (props: PropsWithViewMode) => {
  const { source, viewMode } = props;

  const { field } = useInput({ source });

  const paymentMethod = detectCardIssuer(field.value);

  if (!viewMode) {
    return null;
  }

  return paymentMethod ? (
    <SvgIcon name="Financial" {...iconStyles} id={paymentMethod} />
  ) : (
    <Box display="flex" component="span" sx={iconStyles}>
      <CreditCardIcon fontSize="large" sx={{ margin: '0 auto' }} />
    </Box>
  );
};

type PropsWithViewMode = TextInputProps & { viewMode?: boolean };

function detectCardIssuer(cardNumber?: string) {
  cardNumber = String(cardNumber)?.replace(/[\s-]/g, '');

  const patterns: Record<string, RegExp> = {
    amex: /^3[47][0-9]{13}$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    discover: /^6011[0-9]{12}$/,
  };

  for (const issuer in patterns) {
    if (patterns[issuer].test(cardNumber)) {
      return issuer;
    }
  }
  return undefined;
}

const iconStyles = { width: 75, height: 25 };
