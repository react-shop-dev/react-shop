import { useCallback } from 'react';
import { ShopError, ShopErrorCode } from '../../functions/error';
import { DEFAULT_CURRENCY_CODE } from 'src/constants';
import { resolveBrowserLocale } from '../i18n/browserLocale';

type StyleFormat = 'currency' | 'decimal' | 'percent' | 'unit';

export type NumberFormatter = (
  number: number | string | bigint,
  styleOrOptions?: StyleFormat | Intl.NumberFormatOptions,
) => string;

export const useNumberFormatter = (localeParam?: string): NumberFormatter => {
  const locale = localeParam ?? resolveBrowserLocale(undefined, { fullLocale: true });

  const formatNumber: NumberFormatter = useCallback(
    (number, styleOrOptions) => {
      try {
        const options = resolveStyleOrOptions(styleOrOptions);
        const formatter = new Intl.NumberFormat(locale, options);
        return formatter.format(Number(number));
      } catch (error) {
        console.error(new ShopError(ShopErrorCode.FORMATTING_ERROR, (error as Error).message));
        return String(number);
      }
    },
    [locale],
  );

  return formatNumber;
};

const resolveStyleOrOptions = (
  styleOrOptions?: StyleFormat | Intl.NumberFormatOptions | undefined,
  config: FormatConfig = defaultFormat,
): Intl.NumberFormatOptions => {
  if (typeof styleOrOptions === 'string') {
    return config[styleOrOptions] || {};
  } else {
    return styleOrOptions || {};
  }
};

type FormatConfig = {
  currency?: Intl.NumberFormatOptions;
  decimal?: Intl.NumberFormatOptions;
  percent?: Intl.NumberFormatOptions;
  unit?: Intl.NumberFormatOptions;
};

const defaultFormat: FormatConfig = {
  currency: { style: 'currency', currency: DEFAULT_CURRENCY_CODE, currencySign: 'standard' },
  decimal: { minimumFractionDigits: 2 },
  percent: { style: 'percent' },
  unit: { style: 'unit', unit: 'meter' },
};
