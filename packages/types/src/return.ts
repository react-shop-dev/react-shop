import { ClaimOrder } from './claim-order';
import { BaseEntity, MetadataType, SoftDeletableEntity } from './common';
import { LineItem } from './line-item';
import { Order } from './order';
import { ShippingMethod } from './shipping';
import { Swap } from './swap';

export enum ReturnStatus {
  REQUESTED = 'requested',
  RECEIVED = 'received',
  REQUIRES_ACTION = 'requires_action',
  CANCELED = 'canceled',
}

export interface ReturnReason extends SoftDeletableEntity {
  value: string;
  label: string;
  description: string | null;
  parent_return_reason_id: string | null;
  parent_return_reason: ReturnReason | null;
  return_reason_children: ReturnReason[];
  metadata?: MetadataType;
}

export interface ReturnItem {
  return_id: string;
  item_id: string;
  return_order: Return;
  item: LineItem;
  quantity: number;
  is_requested: boolean;
  requested_quantity: number;
  received_quantity: number;
  reason_id: string;
  reason: ReturnReason;
  note: string | null;
  metadata?: MetadataType;
}

export interface Return extends BaseEntity {
  status: ReturnStatus;
  items: ReturnItem[];
  swap_id: string | null;
  swap: Swap;
  order_id: string | null;
  order: Order;
  claim_order_id: ClaimOrder['id'] | null;
  claim_order: ClaimOrder;
  shipping_method: ShippingMethod;
  location_id: string | null;
  shipping_data: Record<string, unknown>;
  refund_amount: number;
  received_at: Date;
  no_notification: boolean | null;
  idempotency_key: string | null;
  metadata: MetadataType;
}
