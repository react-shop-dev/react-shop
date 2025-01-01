import type { Identifier, RsRecord } from 'react-shop-types';
import type { PaginationPayload, SortPayload } from '@type/lib';

export type DataProvider<ResourceType extends string = string> = {
  getList: <RecordType extends RsRecord = any>(
    resource: ResourceType,
    params: GetListParams,
  ) => Promise<GetListResult<RecordType>>;

  getOne: <RecordType extends RsRecord = any>(
    resource: ResourceType,
    params: GetOneParams<RecordType>,
  ) => Promise<GetOneResult<RecordType>>;

  getMany: <RecordType extends RsRecord = any>(
    resource: ResourceType,
    params: GetManyParams,
  ) => Promise<GetManyResult<RecordType>>;

  getManyReference: <RecordType extends RsRecord = any>(
    resource: ResourceType,
    params: GetManyReferenceParams,
  ) => Promise<GetManyReferenceResult<RecordType>>;

  update: <RecordType extends RsRecord = any>(
    resource: ResourceType,
    params: UpdateParams,
  ) => Promise<UpdateResult<RecordType>>;

  updateMany: <RecordType extends RsRecord = any>(
    resource: ResourceType,
    params: UpdateManyParams,
  ) => Promise<UpdateManyResult<RecordType>>;

  create: <
    RecordType extends Omit<RsRecord, 'id'> = any,
    ResultRecordType extends RsRecord = RecordType & { id: Identifier },
  >(
    resource: ResourceType,
    params: CreateParams,
  ) => Promise<CreateResult<ResultRecordType>>;

  delete: <RecordType extends RsRecord = any>(
    resource: ResourceType,
    params: DeleteParams<RecordType>,
  ) => Promise<DeleteResult<RecordType>>;

  deleteMany: <RecordType extends RsRecord = any>(
    resource: ResourceType,
    params: DeleteManyParams<RecordType>,
  ) => Promise<DeleteManyResult<RecordType>>;

  [key: string]: any;
};

export interface GetListParams {
  pagination?: PaginationPayload;
  sort?: SortPayload;
  filter?: any;
  meta?: any;
}
export interface GetListResult<RecordType extends RsRecord = any> {
  data: RecordType[];
  total?: number;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
}

export interface GetInfiniteListResult<RecordType extends RsRecord = any>
  extends GetListResult<RecordType> {
  pageParam: number;
}
export interface GetOneParams<RecordType extends RsRecord = any> {
  id: RecordType['id'];
  meta?: any;
}
export interface GetOneResult<RecordType extends RsRecord = any> {
  data: RecordType;
}

export interface GetManyParams {
  ids: Identifier[];
  meta?: any;
}
export interface GetManyResult<RecordType extends RsRecord = any> {
  data: RecordType[];
}

export interface GetManyReferenceParams {
  target: string;
  id: Identifier;
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: any;
  meta?: any;
}
export interface GetManyReferenceResult<RecordType extends RsRecord = any> {
  data: RecordType[];
  total?: number;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
}

export interface UpdateParams<RecordType extends RsRecord = any> {
  id: RecordType['id'];
  data: Partial<RecordType>;
  previousData: RecordType;
  meta?: any;
}
export interface UpdateResult<RecordType extends RsRecord = any> {
  data: RecordType;
}

export interface UpdateManyParams<T = any> {
  ids: Identifier[];
  data: Partial<T>;
  meta?: any;
}
export interface UpdateManyResult<RecordType extends RsRecord = any> {
  data?: RecordType['id'][];
}

export interface CreateParams<T = any> {
  data: Partial<T>;
  meta?: any;
}
export interface CreateResult<RecordType extends RsRecord = any> {
  data: RecordType;
}

export interface DeleteParams<RecordType extends RsRecord = any> {
  id: RecordType['id'];
  previousData?: RecordType;
  meta?: any;
}
export interface DeleteResult<RecordType extends RsRecord = any> {
  data: RecordType;
}

export interface DeleteManyParams<RecordType extends RsRecord = any> {
  ids: RecordType['id'][];
  meta?: any;
}
export interface DeleteManyResult<RecordType extends RsRecord = any> {
  data?: RecordType['id'][];
}

export type DataProviderResult<RecordType extends RsRecord = any> =
  | CreateResult<RecordType>
  | DeleteResult<RecordType>
  | DeleteManyResult
  | GetListResult<RecordType>
  | GetManyResult<RecordType>
  | GetManyReferenceResult<RecordType>
  | GetOneResult<RecordType>
  | UpdateResult<RecordType>
  | UpdateManyResult;

export type MutationMode = 'pessimistic' | 'optimistic';
export type OnSuccess = (response?: any, variables?: any, context?: any) => void;

export type OnError = (error?: any, variables?: any, context?: any) => void;

export type TransformData = (data: any, options?: { previousData: any }) => any | Promise<any>;

export interface UseDataProviderOptions {
  action?: string;
  fetch?: string;
  meta?: object;
  mutationMode?: MutationMode;
  onSuccess?: OnSuccess;
  onError?: OnError;
  enabled?: boolean;
}

export type SaveHandlerCallbacks = {
  onSuccess?: OnSuccess;
  onError?: OnError;
  transform?: TransformData;
  meta?: any;
};
