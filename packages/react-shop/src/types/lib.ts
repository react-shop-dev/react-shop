import type { ReactNode } from 'react';
import type {
  Identifier,
  Dictionary,
  LineItem,
  Cart,
  TranslationMessages,
  Region,
} from 'react-shop-types';
import type { ShopConfig } from './config';
import type { IntlAdapterComponent } from 'src/client/i18n/IntlClientProvider';

declare global {
  interface Window {
    __REACT_SHOP__: ShopConfig;
  }
}

export interface SortPayload {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface FilterPayload {
  [key: string]: any;
}

export interface PaginationPayload {
  page: number;
  perPage: number;
}

export type MetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export enum ViewMode {
  grid = 'grid',
  list = 'list',
}

export type ThemeType = 'light' | 'dark' | 'system';

export interface ShopSessionProps {
  sessionID: Identifier;
  sessionResult: ShopSession | null;
}

export interface ShopTranslateProps {
  defaultLocale: string;
  locale: string;
  messages: string;
  availableLocales?: string[];
}

export interface ShopReturnProps {
  config: ShopConfig;
  session: ShopSessionProps;
  translate: ShopTranslateProps;
}

export interface ShopProps {
  children: ReactNode;
  meta?: ReactNode;
  className?: string;
  regions?: Region[];
  dir?: 'ltr' | 'rtl';
  IntlAdapter?: IntlAdapterComponent;
  getMessages?: (locale: string) => Promise<TranslationMessages>;
}

export type LineItems = Dictionary<LineItem>;

export interface ShopSession {
  id: Identifier | null;
  cart?: Omit<Cart, 'items'> & { items: LineItems };
  comparison?: unknown;
  [key: string]: any;
}
