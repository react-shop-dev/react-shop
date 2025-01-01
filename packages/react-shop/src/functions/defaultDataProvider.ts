import type { CreateResult, DeleteResult, GetOneResult, UpdateResult } from '@type/data';

export const defaultDataProvider = {
  getList: () => Promise.resolve({ data: [], total: 0 }),
  getOne: () => Promise.resolve<GetOneResult>({ data: null }),
  getMany: () => Promise.resolve({ data: [] }),
  getManyReference: () => Promise.resolve({ data: [], total: 0 }),
  create: () => Promise.resolve<CreateResult>({ data: null }),
  update: () => Promise.resolve<UpdateResult>({ data: null }),
  updateMany: () => Promise.resolve({ data: [] }),
  delete: () => Promise.resolve<DeleteResult>({ data: null }),
  deleteMany: () => Promise.resolve({ data: [] }),
};
