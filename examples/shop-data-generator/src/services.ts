import type { Identifier } from 'react-shop-types';

export const generateServices = (): Service[] => [
  {
    id: 1,
    icon: 'library',
    title: 'Wide Selection',
    description: 'Choose from a vast collection of books across genres and authors',
  },
  {
    id: 2,
    icon: 'discount',
    title: 'Special Discounts',
    description: 'Exclusive offers for our loyal customers',
  },
  {
    id: 3,
    icon: 'support',
    title: 'Customer support',
    description: 'Our support team is ready to assist you anytime',
  },
];

export type ServiceIcon = 'library' | 'discount' | 'support';

export type Service = {
  id: Identifier;
  icon: ServiceIcon;
  title: string;
  description: string;
};
