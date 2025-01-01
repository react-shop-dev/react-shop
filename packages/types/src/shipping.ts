import { Identifier, MetadataType, SoftDeletableEntity } from './common';
import { FulfillmentProvider } from './fulfilment';
import { Order } from './order';
import { Product } from './product';
import { Region } from './region';
import { TaxServiceRate } from './taxes';

export interface ShippingMethod {
  id: string;
  shipping_option_id: Identifier;
  shipping_option: ShippingOption;
  price: number;
  includes_tax?: boolean;
  order_id?: string;
  order?: Order;
  cart_id: Identifier;
  subtotal?: number;
  total?: number;
  tax_total?: number;
  data?: Record<string, unknown>;
}

export type PricedShippingOption = Partial<ShippingOption> & ShippingOptionPricing;

export type ShippingOption = SoftDeletableEntity & {
  name: string;
  region_id?: Identifier;
  region?: Region;
  is_return: boolean;
  amount: number | null;
  provider_id?: string;
  includes_tax?: boolean;
  admin_only: boolean;
  tax_amount?: number | null;
  price_incl_tax?: number | null;
  provider?: FulfillmentProvider;
  price_type?: ShippingOptionPriceType;
  data?: Record<string, unknown>;
  metadata?: MetadataType;
};

export enum ShippingOptionPriceType {
  FLAT_RATE = 'flat_rate',
  CALCULATED = 'calculated',
}

export type ShippingOptionPricing = {
  price_incl_tax: number | null;
  tax_rates?: TaxServiceRate[] | null;
  tax_amount: number;
};

export enum ShippingProfileType {
  DEFAULT = 'default',
  GIFT_CARD = 'gift_card',
  CUSTOM = 'custom',
}

export interface ShippingProfile extends SoftDeletableEntity {
  name: string;
  type: ShippingProfileType;
  products?: Product[];
  shipping_options?: ShippingOption[];
  metadata?: MetadataType;
}
