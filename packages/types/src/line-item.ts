import { Cart } from './cart';
import { ClaimOrder } from './claim-order';
import { BaseEntity, Identifier, MetadataType } from './common';
import { Order } from './order';
import { ProductVariant } from './product';
import { SalesChannel } from './sales-channel';
import { Swap } from './swap';
import { LineItemTaxLine } from './taxes';

export interface LineItem extends BaseEntity {
  title: string;
  description: string | null;
  thumbnail: string | null;
  is_return: boolean;
  should_merge: boolean;
  allow_discounts: boolean;
  includes_tax?: boolean;
  refundable?: number | null;
  has_shipping: boolean | null;
  product_id: Identifier | null;
  original_item_id?: string | null;
  cart_id: Identifier;
  cart?: Cart;
  order_id: string | null;
  order?: Order;
  order_edit_id?: string | null;
  swap_id?: string;
  swap?: Swap;
  claim_order_id?: string;
  claim_order?: ClaimOrder;
  unit_price: number;
  quantity: number;
  fulfilled_quantity: number | null;
  returned_quantity: number | null;
  shipped_quantity: number | null;
  variant_id: Identifier | null;
  variant: ProductVariant;
  sales_channel_id?: string | null;
  sales_channel?: SalesChannel | null;
  tax_lines?: LineItemTaxLine[];
  adjustments?: LineItemAdjustment[];
  total?: number | null;
  subtotal?: number | null;
  tax_total?: number | null;
  original_total?: number | null;
  original_tax_total?: number | null;
  discount_total?: number | null;
  raw_discount_total?: number | null;
  metadata?: MetadataType;
}

export type LineItemAdjustment = {
  id: string;
  item_id: string;
  item: LineItem;
  description: string;
  amount: number;
  metadata?: MetadataType;
};
