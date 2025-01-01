import { useCallback } from 'react';
import { useNumberFormatter } from './useNumberFormatter';
import { useCurrency } from './useCurrency';
import { NO_DIVISION_CURRENCIES } from 'src/constants';

export const usePrice = (locale?: string) => {
  const formatValue = useNumberFormatter(locale);
  const currency = useCurrency();

  const format = useCallback(
    (value: number | string, options?: Intl.NumberFormatOptions) => {
      const valueNumber = toNumber(value);
      if (valueNumber == undefined) {
        return '';
      }
      const divisor = NO_DIVISION_CURRENCIES.includes(currency.toLowerCase()) ? 1 : 100;
      const amount = Number.isInteger(value) ? Math.floor(valueNumber) / divisor : valueNumber;
      return formatValue(amount, { currency, ...options, style: 'currency' });
    },
    [formatValue, currency],
  );

  return format;
};

const toNumber = (value?: number | string) => {
  if (value === '') return undefined;
  const result = Number(value);
  return Number.isNaN(result) ? undefined : result;
};
