import { ReactElement } from 'react';
import type { Identifier, Region } from 'react-shop-types';

export interface OgImage {
  url?: string;
  width?: string;
  height?: string;
  alt?: string;
}

export interface ShopConfig extends Record<string, any> {
  _configReady?: boolean;
  ip?: string;
  host?: string;
  regions?: Region[];
  logo?: {
    src?: string;
    width?: number;
    height?: number;
  };
  title?: {
    default?: string;
    template?: string;
  };
  description?: string;
  openGraph?: {
    type?: string;
    title?: string;
    siteName?: string;
    description?: string;
    url?: string;
    images?: OgImage[];
  };
  social?: {
    name?: string;
    url?: string;
    icon?: ReactElement;
    ariaLabel?: string;
  }[];
  gtag?: string;
  session?: {
    api?: string | null;
    sessionResult?: any;
    sessionID?: Identifier;
  };
  auth?: {
    authApiRoute?: string;
    accountUrl?: string;
    afterLoginUrl?: string;
    registerApi?: string;
    resetPasswordApi?: string;
  };
  product: {
    resource: string;
    title: string;
    slug: string;
    thumbnail: string;
    images: string;
    price: string;
    priceOriginal?: string;
    priceType?: string;
    discount?: string;
    tags?: string;
    status?: string;
  };
  lineItem: {
    quantity: string;
    price: string;
    thumbnail: string;
    productId: string;
  };
  feature?: {
    search?: boolean;
    breadcrumbs?: boolean;
  };
  paths?: {
    baseUrl?: string;
    search?: string;
    checkout?: string;
    product?: string;
  };
}
