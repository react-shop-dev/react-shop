'use client';

import { useCallback, useMemo, Fragment } from 'react';
import { useCartProvider, useCheckoutContext, useIsLoaded, useRedirect } from 'react-shop';
import { FlexBox } from 'react-shop-mui/FlexBox';
import { ToggleOptions } from 'react-shop-mui/ToggleOptions';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles/createTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PAYMENTS } from '@/lib/constants';
import { SvgIcon } from '@/modules/common/SvgIcon';

const PaymentOptions = () => {
  const { cart: { payment_sessions, payment_session, shipping_methods } = {}, isFetching } =
    useCartProvider();
  const redirect = useRedirect();
  const { createPaymentSession } = useCheckoutContext();

  const theme = useTheme();
  const isMediaMatch = useMediaQuery<Theme>(theme.breakpoints.down('sm'));
  const shippingSelected = !!shipping_methods?.length;

  const option = useMemo(
    () => ({
      values: (payment_sessions || []).map(payment => ({
        value: payment.provider_id,
        title: (
          <FlexBox component="span" gap={1}>
            <SvgIcon
              name="Payment"
              id={payment.provider_id}
              title={payment.provider_id}
              height="24"
              width="75"
              opacity={shippingSelected ? 1 : 0.5}
            />
          </FlexBox>
        ),
      })),
    }),
    [payment_sessions, shippingSelected],
  );

  const loaded = useIsLoaded(isFetching);

  const handleChange = useCallback(
    (value: string) => {
      if (value === payment_session?.provider_id) {
        return;
      }
      if (value === PAYMENTS.MANUAL) {
        createPaymentSession(value, {});
      }
      redirect({ query: { payment: value }, options: { scroll: false, keepQuery: true } });
    },
    [redirect, createPaymentSession, payment_session?.provider_id],
  );

  const renderWarning = () => (
    <Alert severity="warning">Please select a shipping method to proceed with your order</Alert>
  );

  const renderPlaceholder = () => <Skeleton variant="rounded" width="100%" height={48} />;

  return option.values?.length ? (
    <Root>
      {!loaded ? (
        renderPlaceholder()
      ) : (
        <Fragment>
          {!shippingSelected ? renderWarning() : null}
          <ToggleOptions
            size="medium"
            fullWidth
            disabled={!shippingSelected || isFetching}
            value={payment_session?.provider_id}
            orientation={isMediaMatch ? 'vertical' : 'horizontal'}
            option={option}
            onHandleChange={handleChange}
          />
        </Fragment>
      )}
    </Root>
  ) : null;
};

const Root = styled(Box)(({ theme }) => ({
  gridColumn: 'span 12',
  marginBottom: theme.spacing(1),
}));

export default PaymentOptions;
