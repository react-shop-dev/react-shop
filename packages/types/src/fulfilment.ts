import { ClaimOrder } from './claim-order';
import { BaseEntity, MetadataType, SoftDeletableEntity } from './common';
import { LineItem } from './line-item';
import { Order } from './order';
import { Swap } from './swap';

export interface FulfillmentProvider {
  id: string;
  is_installed: boolean;
}

export type FulfillmentItem = {
  fulfillment_id: string;
  item_id: string;
  fulfillment: Fulfillment;
  item: LineItem;
  quantity: number;
};

export type TrackingLink = SoftDeletableEntity & {
  url: string;
  tracking_number: string;
  fulfillment_id: string;
  fulfillment: Fulfillment;
  idempotency_key: string;
  metadata?: MetadataType;
};

export interface Fulfillment extends BaseEntity {
  claim_order_id: ClaimOrder['id'];
  claim_order: ClaimOrder;
  order_id: Order['id'];
  order: Order;
  swap_id: Swap['id'];
  swap: Swap;
  location_id: string | null;
  provider_id: string;
  provider: FulfillmentProvider;
  items: FulfillmentItem[];
  tracking_numbers: string[];
  tracking_links: TrackingLink[];
  data: Record<string, unknown>;
  no_notification: boolean;
  idempotency_key: string;
  shipped_at: Date | null;
  canceled_at: Date | null;
  metadata?: MetadataType;
}
