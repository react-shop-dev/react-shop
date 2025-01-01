import { ProductCollection } from './collection';
import { MetadataType, SoftDeletableEntity } from './common';
import { CustomerGroup } from './customer';
import { Product, ProductTag, ProductType } from './product';
import { Region } from './region';

export enum DiscountRuleType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE_SHIPPING = 'free_shipping',
}

export enum AllocationType {
  TOTAL = 'total',
  ITEM = 'item',
}

export enum DiscountConditionType {
  PRODUCTS = 'products',
  PRODUCT_TYPES = 'product_types',
  PRODUCT_COLLECTIONS = 'product_collections',
  PRODUCT_TAGS = 'product_tags',
  CUSTOMER_GROUPS = 'customer_groups',
}

export enum DiscountConditionOperator {
  IN = 'in',
  NOT_IN = 'not_in',
}

export type DiscountCondition = SoftDeletableEntity & {
  type: DiscountConditionType;
  operator: DiscountConditionOperator;
  discount_rule_id: string;
  discount_rule: DiscountRule;
  products: Product[];
  product_types: ProductType[];
  product_tags?: ProductTag[];
  product_collections: ProductCollection[];
  customer_groups?: CustomerGroup[];
  metadata?: MetadataType;
};

export type DiscountRule = SoftDeletableEntity & {
  description: string;
  type: DiscountRuleType;
  value: number;
  allocation: AllocationType;
  conditions: DiscountCondition[];
  metadata?: MetadataType;
};

export type Discount = SoftDeletableEntity & {
  code: string;
  is_dynamic: boolean;
  rule_id: string;
  rule: DiscountRule;
  is_disabled: boolean;
  parent_discount_id: string;
  parent_discount: Discount;
  starts_at: Date;
  ends_at: Date | null;
  valid_duration: string | null;
  regions: Region[];
  usage_limit: number | null;
  usage_count: number;
  metadata?: MetadataType;
};
