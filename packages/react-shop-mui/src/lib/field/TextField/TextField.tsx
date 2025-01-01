import { memo } from 'react';
import { useRecordContext, useTranslate } from 'react-shop';
import get from 'lodash/get';
import Typography, { type TypographyProps } from '@mui/material/Typography';

export interface FieldProps extends TypographyProps {
  source?: string;
  label?: string;
  value?: string;
  record?: object;
}

const Field = (props: FieldProps) => {
  const { variant = 'subtitle1', value, className, source, ...rest } = props;

  const record = useRecordContext(props);

  const translate = useTranslate();
  const finalValue = get(record, source as string, value);

  return (
    <Typography component="span" variant={variant} fontSize={15} className={className} {...rest}>
      {finalValue != null && typeof finalValue === 'string'
        ? translate(finalValue, { _: value })
        : JSON.stringify(finalValue)}
    </Typography>
  );
};

export const TextField = memo(Field);
