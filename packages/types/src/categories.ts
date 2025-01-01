import { BaseEntity, Identifier, MetadataType } from './common';
import { Product } from './product';

export type ProductCategory = BaseEntity & {
  name: string;
  handle: string;
  description?: string;
  parent_category_id: Identifier | null;
  category_children?: ProductCategory[];
  category_children_ids?: Identifier[];
  is_active?: boolean;
  is_internal?: boolean;
  rank?: number;
  products?: Product[];
  metadata?: MetadataType;
};
