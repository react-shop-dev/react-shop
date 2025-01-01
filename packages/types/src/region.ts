import { MetadataType, SoftDeletableEntity } from './common';
import { Country } from './country';
import { Currency } from './currency';
import { FulfillmentProvider } from './fulfilment';
import { PaymentProvider } from './payment';
import { TaxProvider, TaxRate } from './taxes';

export interface Region extends SoftDeletableEntity {
  name: string;
  currency_code: string;
  countries?: Country[];
  currency?: Currency;
  payment_providers?: PaymentProvider[];
  fulfillment_providers?: FulfillmentProvider[];
  tax_rate: number;
  tax_code: string | null;
  includes_tax: boolean;
  automatic_taxes: boolean;
  tax_provider_id?: TaxProvider['id'] | null;
  tax_provider?: TaxProvider;
  tax_rates: TaxRate[] | null;
  gift_cards_taxable?: boolean;
  metadata?: MetadataType;
}
