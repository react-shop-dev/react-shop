'use server';

import { storage } from '@/storage.config';
import type { TransactionOptions } from 'unstorage';

export const storageGetItem = async (key: string) => storage.getItem(key);

export const storageSetItem = async (key: string, data: any) =>
  storage.setItem(key, JSON.stringify(data));

export const storageRemoveItem = async (key: string) => storage.removeItem(key);

export type StorageGetItemsOptions = (
  | string
  | {
      key: string;
      options?: TransactionOptions;
    }
)[];

export const storageGetItems = async (items: StorageGetItemsOptions) => storage.getItems(items);
