import type { DeleteParams, GetOneParams, UpdateParams } from 'react-shop';
import {
  storageGetItem,
  storageSetItem,
  storageRemoveItem,
  storageGetItems,
  type StorageGetItemsOptions,
} from './storage';

/**
 * Only for demo purpose
 */
export const unstorageDataProvider = {
  getList: () => Promise.resolve({ data: [], total: 0 }),
  getOne: async (resource: string, params: GetOneParams) => {
    const data = await storageGetItem(`${resource}${params.id}`);
    return { data };
  },
  getMany: async (options: StorageGetItemsOptions) => {
    const data = await storageGetItems(options);
    return { data };
  },
  getManyReference: () => Promise.resolve({ data: [], total: 0 }),
  create: async (resource: string, params: UpdateParams) => {
    await storageSetItem(`${resource}${params.id}`, params.data);
    const data = await storageGetItem(`${resource}${params.id}`);
    return { data };
  },
  update: async (resource: string, params: UpdateParams) => {
    await storageSetItem(`${resource}${params.id}`, params.data);
    const data = await storageGetItem(`${resource}${params.id}`);
    return { data };
  },
  updateMany: () => Promise.resolve({ data: [] }),
  delete: async (resource: string, params: DeleteParams) => {
    const data = await storageRemoveItem(`${resource}${params.id}`);
    return { data };
  },
  deleteMany: () => Promise.resolve({ data: [] }),
};
