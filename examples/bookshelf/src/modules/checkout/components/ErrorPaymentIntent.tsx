'use client';

import type { PaymentIntentError } from 'react-shop-stripe';
import Typography from '@mui/material/Typography';

export const ErrorPaymentIntent = (props: PaymentIntentError) => {
  return (
    <>
      <Typography variant="h6" color="error">
        Payment Intent Error
      </Typography>
      {process.env.NODE_ENV !== 'production' ? (
        <>
          <Typography component="p">
            <strong>Error type:</strong> {props.type}
          </Typography>
          <Typography component="p">
            <strong>Status code:</strong> {props.statusCode}
          </Typography>
          <Typography component="p">
            <strong>Message:</strong>
            {props.message}
          </Typography>
          {props.logUrl ? (
            <Typography component="p">
              <a href={props.logUrl} style={{ textDecoration: 'underline' }}>
                Request log URL
              </a>
            </Typography>
          ) : null}
        </>
      ) : null}
    </>
  );
};
