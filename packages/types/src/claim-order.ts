import { Address } from './address';
import { MetadataType, SoftDeletableEntity } from './common';
import { Fulfillment } from './fulfilment';
import { LineItem } from './line-item';
import { Order } from './order';
import { ProductVariant } from './product';
import { Return } from './return';
import { ShippingMethod } from './shipping';

export enum ClaimType {
  REFUND = 'refund',
  REPLACE = 'replace',
}

export enum ClaimPaymentStatus {
  NA = 'na',
  NOT_REFUNDED = 'not_refunded',
  REFUNDED = 'refunded',
}

export enum ClaimFulfillmentStatus {
  NOT_FULFILLED = 'not_fulfilled',
  PARTIALLY_FULFILLED = 'partially_fulfilled',
  FULFILLED = 'fulfilled',
  PARTIALLY_SHIPPED = 'partially_shipped',
  SHIPPED = 'shipped',
  PARTIALLY_RETURNED = 'partially_returned',
  RETURNED = 'returned',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}

export enum ClaimReason {
  MISSING_ITEM = 'missing_item',
  WRONG_ITEM = 'wrong_item',
  PRODUCTION_FAILURE = 'production_failure',
  OTHER = 'other',
}

export type ClaimTag = SoftDeletableEntity & {
  value: string;
  metadata?: MetadataType;
};

export type ClaimImage = SoftDeletableEntity & {
  claim_item_id: string;
  claim_item: ClaimItem;
  url: string;
  metadata?: MetadataType;
};

export type ClaimItem = SoftDeletableEntity & {
  claim_order_id: string;
  claim_order: ClaimOrder;
  item_id: string;
  item: LineItem;
  variant_id: string;
  variant: ProductVariant;
  reason: ClaimReason;
  note: string;
  quantity: number;
  images: ClaimImage[];
  tags: ClaimTag[];
};

export interface ClaimOrder extends SoftDeletableEntity {
  payment_status: ClaimPaymentStatus;
  fulfillment_status: ClaimFulfillmentStatus;
  claim_items: ClaimItem[];
  additional_items: LineItem[];
  type: ClaimType;
  order_id: Order['id'];
  order: Order;
  return_order: Return;
  shipping_address_id: string;
  shipping_address: Address;
  shipping_methods: ShippingMethod[];
  fulfillments: Fulfillment[];
  refund_amount: number;
  canceled_at: Date | null;
  no_notification: boolean;
  idempotency_key: string;
  metadata?: MetadataType;
}
