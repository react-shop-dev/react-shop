import { Fragment } from 'react';
import {
  useTranslate,
  useShopSession,
  useCartProvider,
  useShopConfig,
  usePrice,
  cartOpenState,
  useSetAtom,
} from 'react-shop';
import Typography from '@mui/material/Typography';
import { Button, type ButtonProps } from '@button/Button';
import { NextMuiLink } from '@common/NextMuiLink';

export const CheckoutLink = (props: CheckoutLinkProps) => {
  const { id: sessionId, data } = useShopSession();
  const {
    id = data?.cart ? sessionId : undefined,
    label = 'rs.checkout.link',
    showTotal = true,
    ...rest
  } = props;

  const translate = useTranslate();
  const config = useShopConfig();
  const { cart: { total = 0, payment_session } = {} } = useCartProvider();
  const formatPrice = usePrice();
  const setOpen = useSetAtom(cartOpenState);

  const linkToCheckout = config?.paths?.checkout;
  const paymentProvider = payment_session?.provider_id;

  return (
    <Button
      href={{
        pathname: linkToCheckout,
        query: { ...(id ? { id } : {}), ...(paymentProvider ? { payment: paymentProvider } : {}) },
      }}
      component={NextMuiLink}
      onClick={() => setOpen(false)}
      label={
        <Fragment>
          {translate(label)}
          {'\u00A0'}
          {showTotal ? (
            <Typography component="span" fontWeight="inherit" fontSize={16}>
              {formatPrice(total)}
            </Typography>
          ) : null}
        </Fragment>
      }
      {...rest}
    />
  );
};

export type CheckoutLinkProps = ButtonProps & {
  id?: string;
  label?: string;
  showTotal?: boolean;
};
