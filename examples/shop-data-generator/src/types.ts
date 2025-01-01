import type {
  Product,
  ProductTag,
  ProductCategory,
  Order,
  Customer,
  PriceType,
  Region,
  ShippingOption,
} from 'react-shop-types';
import type { Service } from './services';
import type { Slide } from './slides';
import type { Review } from './reviews';
import { COLORS, FORMATS, STOCK_STATUS, PRODUCT_TYPE, SIZES } from './constants';
import type { Session } from './cart';

export type StockStatus = typeof STOCK_STATUS;

export type StockItemStatus = StockStatus[keyof typeof STOCK_STATUS];

export type Format = (typeof FORMATS)[number];
export type Color = (typeof COLORS)[number];
export type Size = (typeof SIZES)[number];

type Book = { author?: string };
type Game = { brand?: string };
type Accessory = { brand?: string; material?: string };
type Toys = { material?: string };

export type StoreItemType = (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE];

type TypeMap = {
  [PRODUCT_TYPE.book]: Book;
  [PRODUCT_TYPE.game]: Game;
  [PRODUCT_TYPE.accessory]: Accessory;
  [PRODUCT_TYPE.toys]: Toys;
};
type SpecificItem = TypeMap[keyof TypeMap];

type GetType<T extends keyof TypeMap | unknown> = T extends keyof TypeMap
  ? TypeMap[T]
  : NonNullable<unknown>;

export type Metadata = {
  color?: Color[];
  format?: Format[];
  size?: Size[];
};

export type StoreItemBase<T = StoreItemType> = Pick<
  Product,
  'title' | 'subtitle' | 'thumbnail' | 'description' | 'category_id'
> & {
  imagesCount?: number;
  type?: T;
} & GetType<T>;

export type PublishedItem<T = StoreItemType> = {
  sales?: number;
  rating: number | null;
  tags?: ProductTag[];
  reviews?: Review[];
} & (T extends 'book' ? { published?: Date | string } : { published: null });

export type StoreItem = Product &
  SpecificItem &
  PublishedItem & {
    _price?: PriceType['calculated_price'];
    stock_status: StockItemStatus;
  } & Metadata;

export interface Db {
  regions: Region[];
  categories: ProductCategory[];
  services: Service[];
  slides: Slide[];
  reviews: Review[];
  products: StoreItem[];
  session: Session[];
  customers: Customer[];
  shipping: ShippingOption[];
  orders: Order[];
}
