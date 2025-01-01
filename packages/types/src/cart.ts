import { Address } from './address';
import { Identifier, MetadataType, SoftDeletableEntity } from './common';
import { Customer } from './customer';
import { Discount } from './discount';
import { GiftCard } from './gift-cart';
import { LineItem } from './line-item';
import { Payment, PaymentSession } from './payment';
import { Region } from './region';
import { SalesChannel } from './sales-channel';
import { ShippingMethod } from './shipping';

export enum CartType {
  DEFAULT = 'default',
  SWAP = 'swap',
  DRAFT_ORDER = 'draft_order',
  AYMENT_LINK = 'payment_link',
  CLAIM = 'claim',
}

export type Cart = SoftDeletableEntity & {
  readonly object: string;
  type: CartType;
  region_id: Identifier;
  region: Region;
  items: LineItem[];
  idempontency_key: string;
  payment_id?: string | null;
  payment?: Payment | null;
  payment_authorized_at?: Date | null;
  payment_session: PaymentSession | null;
  payment_sessions?: PaymentSession[] | null;
  shipping_methods: ShippingMethod[];
  sales_channel_id: string | null;
  sales_channel: SalesChannel;
  discounts?: Discount[];
  gift_cards?: GiftCard[];
  customer_id: Identifier | null;
  customer: Customer | null;
  email: string | null;
  shipping_address_id?: string | null;
  shipping_address?: Address | null;
  billing_address_id?: string | null;
  billing_address?: Address | null;
  total: number;
  subtotal: number;
  item_tax_total?: number | null;
  discount_total?: number;
  raw_discount_total?: number;
  tax_total?: number | null;
  shipping_total?: number;
  shipping_tax_total?: number | null;
  refunded_total?: number;
  refundable_amount?: number;
  completed_at?: Date | null;
  metadata?: MetadataType;
  context?: Record<string, unknown>;
};
