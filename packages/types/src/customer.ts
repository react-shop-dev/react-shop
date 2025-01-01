import { Address } from './address';
import { Identifier, MetadataType, SoftDeletableEntity } from './common';
import { Order } from './order';
import { CardPayment } from './payment';
import { PriceList } from './price';

export type CustomerGroup = SoftDeletableEntity & {
  name: string;
  customers: Customer;
  price_lists: PriceList[];
  metadata?: MetadataType;
};

export type Customer = SoftDeletableEntity & {
  email: string;
  password?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  image?: string;
  phone?: string | null;
  date_of_birth?: Date | string;
  billing_address_id?: Identifier | null;
  billing_address?: Address;
  shipping_addresses?: Address[];
  payments?: CardPayment[];
  has_account?: boolean;
  groups?: CustomerGroup[];
  orders?: Order[];
  metadata?: MetadataType;
};
