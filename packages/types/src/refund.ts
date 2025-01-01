import { BaseEntity, Identifier, MetadataType } from './common';
import { Order } from './order';
import { Payment } from './payment';

export enum RefundReason {
  DISCOUNT = 'discount',
  RETURN = 'return',
  SWAP = 'swap',
  CLAIM = 'claim',
  OTHER = 'other',
}

export interface Refund extends BaseEntity {
  order_id: Identifier;
  amount: number;
  idempotency_key: string;
  payment_id: Identifier;
  reason: RefundReason;
  note: string | null;
  order: Order;
  payment: Payment;
  metadata?: MetadataType;
}
