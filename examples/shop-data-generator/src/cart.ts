import cookies from 'cookie';
import {
  type Cart,
  type LineItem,
  type Dictionary,
  type Identifier,
  type Region,
  CartType,
} from 'react-shop-types';
import { regions, DEFAULT_REGION } from './regions';
import { salesChannel } from './shared';
import { CART_ID, COUNTRY_COOKIE, SESSION_COOKIE } from './constants';

export interface Session {
  id: Identifier | null;
  cart: Omit<Cart, 'items'> & { items: Dictionary<LineItem> };
  comparison?: unknown;
}

const defaultCart = {
  id: CART_ID,
  object: 'cart',
  type: CartType.DEFAULT,
  total: 0,
  subtotal: 0,
  tax_total: 0,
  shipping_total: 0,
  shipping_tax_total: 0,
  item_tax_total: 0,
  discount_total: 0,
  items: {},
  idempontency_key: `${Date.now()}`,
  payment_session: null,
  payment_sessions: [],
  region_id: regions[DEFAULT_REGION].id,
  region: regions[DEFAULT_REGION],
  email: null,
  customer_id: null,
  customer: null,
  shipping_methods: [],
  sales_channel_id: salesChannel.id,
  sales_channel: salesChannel,
};

const defaultSession = {
  id: null,
  cart: defaultCart,
};

const regionMap = new Map<string, Region>();

const generateSession = (): Session[] => {
  if (typeof window === 'undefined') {
    return [defaultSession];
  }

  const cookieStore = cookies.parse(document.cookie);
  const sessionId = cookieStore[SESSION_COOKIE];
  const country = cookieStore[COUNTRY_COOKIE];

  Object.values(regions).forEach(region => {
    region.countries?.forEach(c => {
      regionMap.set(c.iso_2, region);
    });
  });

  const region = regionMap.get(country) ?? regions[DEFAULT_REGION];

  const cart = {
    ...defaultCart,
    region_id: region.id,
    region,
  };

  return sessionId
    ? [
        {
          id: sessionId,
          cart,
        },
      ]
    : [];
};

export { generateSession };
