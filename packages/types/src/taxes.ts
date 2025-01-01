import { BaseEntity, MetadataType, WithOptionalProperty } from './common';
import { LineItem } from './line-item';
import { Product, ProductType } from './product';
import { Region } from './region';
import { ShippingOption } from './shipping';

export interface TaxLine extends WithOptionalProperty<BaseEntity, 'id'> {
  rate: number;
  name: string;
  code: string | null;
  metadata?: MetadataType;
}

export interface LineItemTaxLine extends TaxLine {
  item_id: string;
  item?: LineItem;
}

export interface TaxProvider {
  id: string;
  is_installed: boolean;
}

export interface TaxRate extends BaseEntity {
  rate: number | null;
  code: string | null;
  name: string;
  region_id: Region['id'];
  region: Region;
  metadata?: MetadataType;
  products: Product[];
  product_types: ProductType[];
  shipping_options: ShippingOption[];
  product_count?: number;
  product_type_count?: number;
  shipping_option_count?: number;
}

export type TaxServiceRate = {
  rate?: number | null;
  name: string;
  code: string | null;
};
