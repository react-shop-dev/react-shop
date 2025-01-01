import { Cart } from './cart';
import { Address } from './address';
import { ClaimOrder } from './claim-order';
import { BaseEntity, Identifier, MetadataType } from './common';
import { Currency } from './currency';
import { Customer } from './customer';
import { DraftOrder } from './draft-order';
import { Fulfillment } from './fulfilment';
import { LineItem } from './line-item';
import { Refund } from './refund';
import { Region } from './region';
import { Return } from './return';
import { SalesChannel } from './sales-channel';
import { ShippingMethod } from './shipping';
import { Swap } from './swap';
import { Payment } from './payment';
import { Discount } from './discount';
import { GiftCard } from './gift-cart';

export enum OrderStatus {
  PENDING = 'pending',
  ARCHIVED = 'archived',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  REQUIRES_ACTION = 'requires_action',
}

export enum PaymentStatus {
  AWAITING = 'awaiting',
  NOT_PAID = 'not_paid',
  CANCELED = 'canceled',
  CAPTURED = 'captured',
  REQUIRES_ACTION = 'requires_action',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
}

export enum FulfillmentStatus {
  NOT_FULFILLED = 'not_fulfilled',
  PARTIALLY_FULFILLED = 'partially_fulfilled',
  FULFILLED = 'fulfilled',
  SHIPPED = 'shipped',
  PARTIALLY_SHIPPED = 'partially_shipped',
  RETURNED = 'returned',
  PARTIALLY_RETURNED = 'partially_returned',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}

export type Order = BaseEntity & {
  readonly object: string;
  region_id: Identifier;
  display_id: number;
  draft_order_id: string | null;
  region: Region;
  status: OrderStatus;
  payment_status: PaymentStatus;
  fulfillment_status?: FulfillmentStatus;
  cart_id: Identifier;
  cart?: Cart;
  currency_code: Currency['code'];
  currency?: Currency;
  customer_id: Identifier;
  customer: Customer;
  email: string;
  items: LineItem[];
  no_notification: boolean | null;
  idempotency_key: string;
  external_id: string | null;
  payments: Payment[];
  shipping_address_id: Identifier;
  shipping_address: Address;
  shipping_methods: ShippingMethod[];
  billing_address_id: Identifier | null;
  billing_address: Address;
  sales_channel_id: string | null;
  sales_channel: SalesChannel;
  total: number;
  subtotal: number;
  paid_total: number;
  refundable_amount: number;
  shipping_total: number;
  tax_total: number | null;
  item_tax_total: number | null;
  shipping_tax_total?: number | null;
  tax_rate: number | null;
  raw_discount_total?: number;
  discount_total: number;
  refunded_total?: number;
  gift_card_total?: number;
  gift_card_tax_total?: number;
  draft_order?: DraftOrder;
  discounts?: Discount[];
  gift_cards?: GiftCard[];
  claims?: ClaimOrder[];
  refunds?: Refund[];
  returns?: Return[];
  swaps?: Swap[];
  fulfillments?: Fulfillment[];
  returnable_items?: LineItem[];
  canceled_at: Date | null;
  metadata?: MetadataType;
};
