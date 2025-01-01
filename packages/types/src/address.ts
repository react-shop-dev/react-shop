import { Identifier, MetadataType, SoftDeletableEntity } from './common';
import { Country } from './country';
import { Customer } from './customer';

export type Address = SoftDeletableEntity & {
  first_name?: string | null;
  last_name?: string | null;
  postal_code?: number | string | null;
  address_1?: string | null;
  address_2?: string | null;
  city?: string | null;
  country_code?: string | null;
  country?: Country | null;
  company?: string | null;
  customer_id?: Identifier | null;
  customer?: Customer | null;
  phone?: string | null;
  province?: string | null;
  metadata?: MetadataType;
};
