import { Region } from 'react-shop-types';

export const LOCAL_STORAGE_KEY = 'ReactShopStore';
export const SESSION_KEY = process.env.NEXT_PUBLIC_SESSION_COOKIE || '_shop_session_id';
export const DEFAULT_CART_ID = 'cart_shop_1';
export const COUNTRY_KEY = process.env.NEXT_PUBLIC_COUNTRY_COOKIE || '_shop_country';

export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const LOCALE_HEADER = 'x-default-locale';
export const AVAILABLE_LOCALES_HEADER = 'x-available-locales';

export const DOMAIN_ORIGIN_HEADER = '_shop_origin';

export const COOKIE_ACCEPT_NAME = '_shop_accept_cookies';
export const VIEWED_PRODUCTS_COOKIE = '_shop_viewed_products';

export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_DIR = 'ltr';

export const DEFAULT_CURRENCY_CODE = 'usd';
export const DEFAUT_CURRENCY = { code: DEFAULT_CURRENCY_CODE, symbol: '$', name: 'US Dollar' };

export const DEFAULT_REGION: Region = {
  id: 'reg_us',
  name: 'us',
  currency_code: DEFAULT_CURRENCY_CODE,
  currency: DEFAUT_CURRENCY,
  includes_tax: false,
  automatic_taxes: true,
  tax_rates: [],
  tax_code: null,
  tax_rate: 0,
  countries: [
    {
      id: 'us',
      iso_2: 'us',
      iso_3: 'usa',
      name: 'united states',
      display_name: 'United States',
      region_id: 'reg_us',
    },
  ],
};

export const NO_DIVISION_CURRENCIES = [
  'krw',
  'jpy',
  'vnd',
  'clp',
  'pyg',
  'xaf',
  'xof',
  'bif',
  'djf',
  'gnf',
  'kmf',
  'mga',
  'rwf',
  'xpf',
  'htg',
  'vuv',
  'xag',
  'xdr',
  'xau',
];
