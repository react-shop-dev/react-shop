import { OrderStatus } from 'react-shop-types';

export const STORAGE_URL = 'https://storage.googleapis.com/bookshelf-demosite';
export const STORAGE_IMAGE_FORMAT = 'webp';

export const MAX_SALES = 3200;
export const MIN_SALES = 1200;

export const MIN_STOCK_VALUE = 1;
export const MAX_STOCK_VALUE = 25;

export const EBOOK_DISCOUNT = 200;

export const CART_ID = 'cart_shop_1';
export const SESSION_COOKIE = process.env.NEXT_PUBLIC_SESSION_COOKIE || '_shop_session_id';
export const COUNTRY_COOKIE = process.env.NEXT_PUBLIC_COUNTRY_COOKIE || '_shop_country';

export const STOCK_STATUS = {
  inStock: 'In Stock',
  outOfStock: 'Out of Stock',
  preOrder: 'Pre-order',
} as const;

export const ORDER_STATUS: Record<keyof typeof OrderStatus, OrderStatus> = {
  PENDING: OrderStatus.PENDING,
  ARCHIVED: OrderStatus.ARCHIVED,
  CANCELED: OrderStatus.CANCELED,
  COMPLETED: OrderStatus.COMPLETED,
  REQUIRES_ACTION: OrderStatus.REQUIRES_ACTION,
};

export const REVIEW_STATUS = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
} as const;

export const PRODUCT_TYPE = {
  book: 'book',
  game: 'game',
  accessory: 'accessory',
  toys: 'toys',
} as const;

export const FORMATS = ['Paperback', 'E-book', 'Hardcover'] as const;
export const COLORS = ['Black', 'Silver', 'Gold'] as const;
export const SIZES = ['Small', 'Medium'] as const;

export const MIN_RATING = 2;
export const MAX_RATING = 5;

export const PUBLISHED_AGO = 10;

export const MOCK_CUSTOMER_ID = process.env.NEXT_PUBLIC_USER_ID;
export const MOCK_CUSTOMER_FIRST_NAME = 'John';
export const MOCK_CUSTOMER_LAST_NAME = 'Doe';
export const MOCK_CUSTOMER_EMAIL = 'demo@mail.com';

export const PAYMENTS = {
  manual: { id: 'shop-pay', is_installed: true },
  stripe: { id: 'stripe', is_installed: !!process.env.NEXT_PUBLIC_STRIPE_KEY },
};

export const CURRENCIES = {
  us: { code: 'usd', symbol: '$', name: 'US Dollar' },
  eu: { code: 'eur', symbol: '€', name: 'Euro' },
  ua: { code: 'uah', symbol: '₴', name: 'Гривня' },
};
