import { ProductCategory } from './categories';
import { ProductCollection } from './collection';
import { Identifier, MetadataType, SoftDeletableEntity } from './common';
import { MoneyAmount, PriceType } from './price';
import { SalesChannel } from './sales-channel';
import { ShippingProfile } from './shipping';

export type Image = SoftDeletableEntity & {
  url: string;
  metadata?: MetadataType;
};

export type ProductTag = SoftDeletableEntity & {
  value?: string;
  metadata?: MetadataType;
};

export type ProductOptionValue = SoftDeletableEntity & {
  value: string;
  option_id?: Identifier;
  option?: ProductOption | null;
  variant_id?: Identifier;
  metadata?: MetadataType;
};

export type ProductOption = SoftDeletableEntity & {
  title: string;
  product_id?: Identifier;
  product?: Product | null;
  values: ProductOptionValue[];
  metadata?: MetadataType;
};

export type ProductVariant = SoftDeletableEntity & {
  title: string;
  product_id?: string | null;
  product?: Product | null;
  prices?: MoneyAmount[];
  sku?: string | null;
  barcode?: string | null;
  ean?: string | null;
  hs_code?: string | null;
  upc?: string | null;
  manage_inventory?: boolean;
  inventory_quantity?: number;
  options: ProductOptionValue[];
  original_price: number;
  calculated_price?: number;
  original_price_inc_tax?: number | null;
  calculated_price_inc_tax?: number | null;
  original_tax?: number | null;
  tax_rates?: number | null;
  calculated_tax?: number | null;
  allow_backorder?: boolean;
  variant_rank?: number | null;
  purchasable?: boolean;
  origin_country?: string | null;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  weight?: number | null;
  metadata?: MetadataType;
};

export interface ProductType extends SoftDeletableEntity {
  value: string;
  metadata?: MetadataType;
}

export enum ProductStatus {
  DRAFT = 'draft',
  PROPOSED = 'proposed',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
}

export interface Product extends SoftDeletableEntity {
  title: string;
  subtitle?: string | null;
  description: string | null;
  handle: string | null;
  thumbnail: string | null;
  images: Image[];
  is_gitfcard: boolean;
  discountable: boolean;
  status: ProductStatus;
  categories: ProductCategory[];
  collection_id: string | null;
  collection: ProductCollection | null;
  tags?: ProductTag[];
  options: ProductOption[];
  variants: ProductVariant[];
  profile_id: string;
  profile: ShippingProfile;
  profiles: ShippingProfile[];
  sales_channels: SalesChannel[];
  width?: number | null;
  height?: number | null;
  length?: number | null;
  weight?: number | null;
  material?: string | null;
  price: PriceType;
  origin_country?: string | null;
  type_id?: Identifier | null;
  type?: ProductType | null;
  external_id?: string | null;
  hs_code?: string | null;
  mid_code?: string | null;
  is_giftcard?: boolean;
  metadata?: MetadataType;
  [key: string]: any;
}
