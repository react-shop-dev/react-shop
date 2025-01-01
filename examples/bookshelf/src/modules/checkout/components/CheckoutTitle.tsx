'use client';

import { useTranslate } from 'react-shop/translate';
import Typography, { type TypographyProps } from '@mui/material/Typography';

type CheckoutTitleProps = { title: string } & TypographyProps;

export const CheckoutTitle = (props: CheckoutTitleProps) => {
  const { title, sx, ...rest } = props;

  const translate = useTranslate();

  return (
    <Typography variant="h5" component="h6" gutterBottom sx={sx} {...rest}>
      {translate(title, { _: title })}
    </Typography>
  );
};
