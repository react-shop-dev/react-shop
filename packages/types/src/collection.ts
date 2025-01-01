import { MetadataType, SoftDeletableEntity } from './common';
import { Product } from './product';

export type ProductCollection = SoftDeletableEntity & {
  title: string;
  handle: string;
  products: Product[];
  metadata?: MetadataType;
};
