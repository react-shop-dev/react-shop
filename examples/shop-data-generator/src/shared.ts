import { ShippingProfileType } from 'react-shop-types';
import { faker } from './faker';

export const profile = {
  id: `sp_${faker.string.uuid()}`,
  type: ShippingProfileType.DEFAULT,
  name: 'Default Shipping Profile',
};

export const salesChannel = {
  id: `sc_${faker.string.uuid()}`,
  name: 'Default Sales Channel',
  is_disabled: false,
  description: 'Created by React Shop',
};
