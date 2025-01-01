import { OrderStatus, PaymentStatus } from 'react-shop-types';
import type { StockStatus } from '@/types';

export const MOCK_USER_EMAIL = 'demo@mail.com';

export const STORAGE_URL = 'https://storage.googleapis.com/bookshelf-demosite';

export const THUMBNAIL_FORMAT = 'webp';

export const MAIL_FROM = 'bookshelf@reactshop.dev';

export const ACCOUNT_URL = '/account';

export const STORAGE_USER_PREFIX = 'user:';

export const HOST_URL = process.env.__NEXT_PRIVATE_ORIGIN || process.env.NEXT_PUBLIC_APP_URL;

export const STOCK_STATUS: StockStatus = {
  inStock: 'In Stock',
  outOfStock: 'Out of Stock',
  preOrder: 'Pre-order',
};

export const ORDER_STATUS: Record<keyof typeof OrderStatus, OrderStatus> = {
  PENDING: OrderStatus.PENDING,
  ARCHIVED: OrderStatus.ARCHIVED,
  CANCELED: OrderStatus.CANCELED,
  COMPLETED: OrderStatus.COMPLETED,
  REQUIRES_ACTION: OrderStatus.REQUIRES_ACTION,
};

export const PAYMENT_STATUS: Record<keyof typeof PaymentStatus, PaymentStatus> = {
  AWAITING: PaymentStatus.AWAITING,
  NOT_PAID: PaymentStatus.NOT_PAID,
  CANCELED: PaymentStatus.CANCELED,
  CAPTURED: PaymentStatus.CAPTURED,
  REQUIRES_ACTION: PaymentStatus.REQUIRES_ACTION,
  REFUNDED: PaymentStatus.REFUNDED,
  PARTIALLY_REFUNDED: PaymentStatus.PARTIALLY_REFUNDED,
};

export const PAYMENTS = {
  MANUAL: 'shop-pay',
  STRIPE: 'stripe',
};
