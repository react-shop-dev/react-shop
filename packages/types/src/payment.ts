import { Address } from './address';
import { Identifier, BaseEntity } from './common';
import { Currency } from './currency';
import { PaymentStatus } from './order';

export interface PaymentSession extends BaseEntity {
  cart_id: Identifier | null;
  provider_id: string;
  data: Record<string, any>;
  amount: number;
  is_selected: boolean | null;
  is_initiated: boolean;
  status?: string;
  idempotency_key?: string | null;
  payment_authorized_at?: Date | null;
}

export type BillingDetails = {
  email?: string | null;
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  address?: Omit<Address, 'id'>;
  shipping_address_id?: string;
};

export type OnPlaceOrderPayload = {
  payment_id: string;
  billing_details: BillingDetails;
  payment_status?: PaymentStatus;
  data?: Record<string, any>;
};

export type CardPayment = {
  cvc: string;
  card_number: string;
  expire_at: {
    expYear: number;
    expMonth: number;
  };
};

export type Payment = BaseEntity & {
  provider_id: string;
  order_id?: string;
  cart_id: Identifier;
  currency?: Currency;
  currency_code?: string;
  amount: number;
  data?: Record<string, unknown>;
  captured_at?: Date | string;
  canceled_at?: Date | string;
};

export interface PaymentProvider {
  id: string;
  is_installed: boolean;
}
