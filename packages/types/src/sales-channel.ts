import { MetadataType, SoftDeletableEntity } from './common';

export interface SalesChannelLocation extends SoftDeletableEntity {
  sales_channel_id: string;
  location_id: string;
  sales_channel: SalesChannel;
}

export interface SalesChannel extends SoftDeletableEntity {
  name: string;
  description: string | null;
  is_disabled: boolean;
  locations?: SalesChannelLocation[];
  metadata?: MetadataType;
}
