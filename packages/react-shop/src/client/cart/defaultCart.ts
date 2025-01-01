import { LineItems } from '@type/lib';
import { CartType, type Cart, type Region } from 'react-shop-types';
import { DEFAULT_CART_ID } from 'src/constants';
import type { UserIdentity } from '../auth';
import { isBrowser } from '@functions/isBrowser';

export type DefaultCart = Omit<Cart, 'items'> & { items: LineItems };

export const defaultCart = (region: Region, identity?: UserIdentity): DefaultCart => ({
  id: DEFAULT_CART_ID,
  object: 'cart',
  type: CartType.DEFAULT,
  items: {},
  idempontency_key: `${Date.now()}`,
  email: identity?.email ?? null,
  customer_id: identity?.id ?? null,
  customer: null,
  total: 0,
  subtotal: 0,
  tax_total: 0,
  shipping_total: 0,
  shipping_tax_total: 0,
  item_tax_total: 0,
  discount_total: 0,
  region_id: region.id,
  region,
  billing_address_id: null,
  billing_address: null,
  shipping_address_id: null,
  shipping_address: null,
  payment_id: null,
  payment: null,
  payment_authorized_at: null,
  payment_session: null,
  payment_sessions: [],
  shipping_methods: [],
  sales_channel_id: 'sc_1',
  sales_channel: {
    id: 'sc_1',
    name: 'Default Sales Channel',
    is_disabled: false,
    description: 'Created by React Shop',
  },
  completed_at: null,
  metadata: null,
  context: {
    ip: isBrowser() ? window.__REACT_SHOP__.config.ip : null,
    user_agent: isBrowser() ? window.navigator.userAgent : null,
  },
});
