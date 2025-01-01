import { SoftDeletableEntity } from './common';
import { Currency } from './currency';
import { CustomerGroup } from './customer';
import { ProductVariant } from './product';
import { Region } from './region';

export enum PriceListStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
}

export enum PriceListType {
  SALE = 'sale',
  OVERRIDE = 'override',
}

export type PriceType = {
  calculated_price: number;
  original_price: number;
  difference?: number;
  price_type: 'sales' | 'default';
};

export type PriceList = SoftDeletableEntity & {
  name: string;
  description: string;
  starts_at: Date | null;
  ends_at: Date | null;
  type: PriceListType;
  status: PriceListStatus;
  customer_groups: CustomerGroup[];
  includes_tax: boolean;
};

export interface MoneyAmount extends SoftDeletableEntity {
  currency_code: string;
  currency?: Currency;
  amount: number;
  min_quantity: number | null;
  max_quantity: number | null;
  price_list_id: string | null;
  price_list: PriceList | null;
  variants: ProductVariant[];
  variant: ProductVariant;
  variant_id: string;
  region_id: string;
  region?: Region;
}
