'use client';
import { ReactElement, memo, isValidElement } from 'react';
import { useTranslate } from 'react-shop/translate';
import Typography from '@mui/material/Typography';

export interface LabelProps {
  title: ReactElement | string;
}

export const Label = memo((props: LabelProps) => {
  const { title } = props;

  const translate = useTranslate();

  if (title === '') {
    return null;
  }

  if (isValidElement(title)) {
    return title;
  }

  return (
    <Typography component="span" variant="body2" sx={{ textTransform: 'capitalize' }}>
      {typeof title === 'string' ? translate(title, { _: title }) : title}
    </Typography>
  );
});

Label.displayName = 'ShopLabel';
