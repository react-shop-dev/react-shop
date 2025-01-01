import { Cart } from './cart';
import { BaseEntity, MetadataType } from './common';
import { Order } from './order';

export enum DraftOrderStatus {
  OPEN = 'open',
  COMPLETED = 'completed',
}

export interface DraftOrder extends BaseEntity {
  display_id: number;
  status: DraftOrderStatus;
  order_id: Order['id'];
  order: Order;
  cart_id: Cart['id'];
  cart: Cart;
  idempotency_key: string;
  no_notification_order: boolean;
  canceled_at: Date | null;
  completed_at: Date | null;
  metadata?: MetadataType;
}
