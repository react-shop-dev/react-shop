import { MetadataType, SoftDeletableEntity } from './common';
import { Order } from './order';
import { Region } from './region';

export type GiftCard = SoftDeletableEntity & {
  code: string;
  value: number;
  balance: number;
  region_id: Region['id'];
  region?: Region;
  order_id: Order['id'];
  order?: Order;
  is_disabled: boolean;
  ends_at: Date;
  tax_rate: number | null;
  metadata?: MetadataType;
};
