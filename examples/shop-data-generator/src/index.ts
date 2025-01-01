import { generateSession } from './cart';
import { generateCategories } from './categories';
import { generateCustomers } from './customers';
import { generateOrders } from './orders';
import { generateProducts } from './products';
import { generateRegions } from './regions';
import { generateReviews, type Review } from './reviews';
import { generateServices, type Service, type ServiceIcon } from './services';
import { generateShippingOptions } from './shipping';
import { generateSlides, type Slide } from './slides';
import type { Db, StoreItem, StoreItemType, Format, Color, Size, StockStatus } from './types';

export type {
  Db,
  StoreItem,
  StoreItemType,
  Service,
  ServiceIcon,
  Slide,
  Review,
  Format,
  Color,
  Size,
  StockStatus,
};

export default (): Db => {
  const db = {} as Db;
  db.regions = generateRegions();
  db.categories = generateCategories();
  db.services = generateServices();
  db.slides = generateSlides();
  db.products = generateProducts();
  db.session = generateSession();
  db.customers = generateCustomers();
  db.shipping = generateShippingOptions();
  db.orders = generateOrders(db);
  db.reviews = generateReviews(db);
  return db;
};
