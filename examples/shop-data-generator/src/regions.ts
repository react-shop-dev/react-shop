import type { Dictionary, Region } from 'react-shop-types';
import { CURRENCIES, PAYMENTS } from './constants';

export const DEFAULT_REGION = 'us';

const taxesRelatedData = {
  automatic_taxes: true,
  includes_tax: false,
  tax_rate: 0,
  tax_code: null,
  tax_provider_id: null,
  tax_rates: [],
  gift_cards_taxable: false,
};

export const regions: Dictionary<Region> = {
  us: {
    id: 'reg_us',
    name: 'us',
    currency_code: 'usd',
    payment_providers: [PAYMENTS.manual, PAYMENTS.stripe],
    currency: CURRENCIES['us'],
    ...taxesRelatedData,
    countries: [
      {
        id: 'us',
        iso_2: 'us',
        iso_3: 'usa',
        name: 'united states',
        display_name: 'United States',
        region_id: 'reg_us',
      },
      {
        id: 'ca',
        iso_2: 'ca',
        iso_3: 'can',
        name: 'canada',
        display_name: 'Canada',
        region_id: 'reg_us',
      },
    ],
  },
  eu: {
    id: 'reg_eu',
    name: 'eu',
    currency_code: 'eur',
    currency: CURRENCIES['eu'],
    payment_providers: [PAYMENTS.manual, PAYMENTS.stripe],
    ...taxesRelatedData,
    countries: [
      {
        id: 'de',
        iso_2: 'de',
        iso_3: 'deu',
        name: 'germany',
        display_name: 'Deutschland',
        region_id: 'reg_eu',
      },
      {
        id: 'fr',
        iso_2: 'fr',
        iso_3: 'fra',
        name: 'france',
        display_name: 'France',
        region_id: 'reg_eu',
      },
      {
        id: 'it',
        iso_2: 'it',
        iso_3: 'ita',
        name: 'italy',
        display_name: 'Italia',
        region_id: 'reg_eu',
      },
      {
        id: 'es',
        iso_2: 'es',
        iso_3: 'esp',
        name: 'spain',
        display_name: 'España',
        region_id: 'reg_eu',
      },
      {
        id: 'pl',
        iso_2: 'pl',
        iso_3: 'pol',
        name: 'poland',
        display_name: 'Polska',
        region_id: 'reg_eu',
      },
    ],
  },
  ua: {
    id: 'reg_ua',
    name: 'ua',
    currency_code: 'uah',
    currency: CURRENCIES['ua'],
    payment_providers: [PAYMENTS.manual],
    ...taxesRelatedData,
    countries: [
      {
        id: 'ua',
        iso_2: 'ua',
        iso_3: 'ua',
        name: 'ukraine',
        display_name: 'Україна',
        region_id: 'reg_ua',
      },
    ],
  },
};

export const generateRegions = (): Region[] =>
  Object.values(regions).map(region => ({
    metadata: {},
    fulfillment_providers: [],
    ...region,
  }));
