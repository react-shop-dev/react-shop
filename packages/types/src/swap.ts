import { Cart } from './cart';
import { Address } from './address';
import { MetadataType, SoftDeletableEntity } from './common';
import { Fulfillment } from './fulfilment';
import { LineItem } from './line-item';
import { Order } from './order';
import { Return } from './return';
import { ShippingMethod } from './shipping';
import { Payment } from './payment';

export enum SwapFulfillmentStatus {
  NOT_FULFILLED = 'not_fulfilled',
  FULFILLED = 'fulfilled',
  SHIPPED = 'shipped',
  PARTIALLY_SHIPPED = 'partially_shipped',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}

export enum SwapPaymentStatus {
  NOT_PAID = 'not_paid',
  AWAITING = 'awaiting',
  CAPTURED = 'captured',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
  DIFFERENCE_REFUNDED = 'difference_refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
  REFUNDED = 'refunded',
  REQUIRES_ACTION = 'requires_action',
}

export interface Swap extends SoftDeletableEntity {
  fulfillment_status: SwapFulfillmentStatus;
  payment_status: SwapPaymentStatus;
  order_id: Order['id'];
  order: Order;
  additional_items?: LineItem[];
  return_order: Return;
  fulfillments: Fulfillment[];
  payment: Payment;
  shipping_address_id: Address['id'];
  shipping_address: Address;
  shipping_methods: ShippingMethod[];
  no_notification: boolean;
  allow_backorder: boolean;
  difference_due: number;
  idempotency_key: string;
  cart_id: Cart['id'];
  cart: Cart;
  confirmed_at: Date | null;
  canceled_at: Date | null;
  metadata?: MetadataType;
}
