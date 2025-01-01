import type { ShippingOption } from 'react-shop-types';
import { regions } from './regions';
import { generateID } from './utils';

const shippingOptions = [
  {
    id: `so_${generateID('ups')}`,
    name: 'UPS',
    region_id: regions['us'].id,
    amount: 800,
  },
  {
    id: `so_${generateID('fedex')}`,
    name: 'FedEx',
    region_id: regions['us'].id,
    amount: 1000,
  },
  {
    id: `so_${generateID('dhl')}`,
    name: 'DHL Express',
    region_id: regions['eu'].id,
    amount: 700,
  },
  {
    id: `so_${generateID('gls')}`,
    name: 'GLS',
    region_id: regions['eu'].id,
    amount: 600,
  },
  {
    id: `so_${generateID('nova_poshta')}`,
    name: 'Nova poshta',
    region_id: regions['ua'].id,
    amount: 500,
  },
  {
    id: `so_${generateID('meest')}`,
    name: 'Meest',
    region_id: regions['ua'].id,
    amount: 700,
  },
];

export const generateShippingOptions = (): ShippingOption[] => {
  return shippingOptions.map(option => ({
    provider_id: 'manual',
    tax_amount: 0,
    is_return: false,
    admin_only: false,
    price_incl_tax: option.amount,
    ...option,
  }));
};
