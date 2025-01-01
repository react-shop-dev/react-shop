import type { PriceType } from 'react-shop-types';
import { useRecordContext, useProductInterface, usePrice } from 'react-shop';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import clsx from 'clsx';
import Stack, { type StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { FieldProps } from '../TextField';

export type PriceFieldProps = Omit<FieldProps, 'value'> &
  StackProps & {
    color?: string;
    discountColor?: string;
    originalSource?: string;
    typeSource?: string;
    value?: number | string;
    valueDefault?: number | string;
    calculateOriginPrice?: (item: PriceType) => number;
    locale?: string;
  };

export const PriceField = (props: PriceFieldProps) => {
  const {
    price: priceKey,
    priceOriginal: priceOriginalKey,
    priceType: priceTypeKey,
  } = useProductInterface();

  const {
    className,
    source = priceKey,
    originalSource = priceOriginalKey,
    typeSource = priceTypeKey,
    color = 'default',
    discountColor = 'error',
    fontSize = 'inherit',
    value,
    valueDefault = 0,
    calculateOriginPrice,
    locale,
    ...rest
  } = props;

  const formatPrice = usePrice(locale);
  const product: Record<string, any> = useRecordContext(props)!;

  const getSource = (path: string, defaultValue?: unknown) =>
    get(product, props.record ? path : `price.${path}`, defaultValue);

  const price = value ?? getSource(source, valueDefault);
  const originalPrice = getSource(originalSource);
  const typePrice = getSource(typeSource, 'default');

  return (
    <Stack
      display="inline-flex"
      flexDirection="row"
      fontSize="1rem"
      alignItems="center"
      gap={1}
      flexWrap="wrap"
      className={clsx('rs-price-field', className)}
      {...rest}
    >
      <Typography component="span" fontSize={fontSize} color={color}>
        {formatPrice(price)}
      </Typography>
      {typePrice === 'sales' ? (
        <Typography fontSize={fontSize} color={discountColor} component="del">
          {formatPrice(
            isFunction(calculateOriginPrice)
              ? calculateOriginPrice(product[priceKey])
              : originalPrice,
          )}
        </Typography>
      ) : null}
    </Stack>
  );
};
