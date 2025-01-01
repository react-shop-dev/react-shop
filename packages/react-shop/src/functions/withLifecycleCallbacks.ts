import type { Identifier, RsRecord } from 'react-shop-types';
import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from '@type/data';

export const withLifecycleCallbacks = (
  dataProvider: DataProvider,
  handlers: ResourceCallbacks[],
): DataProvider => {
  return {
    ...dataProvider,
    getList: async function <RecordType extends RsRecord = any>(
      resource: string,
      params: GetListParams,
    ) {
      let newParams = params;

      newParams = await applyCallbacks({
        name: 'beforeGetList',
        params: newParams,
        dataProvider,
        handlers,
        resource,
      });

      let result = await dataProvider.getList<RecordType>(resource, newParams);

      result = await applyCallbacks({
        name: 'afterGetList',
        params: result,
        dataProvider,
        handlers,
        resource,
      });

      result.data = await Promise.all(
        result.data.map(record =>
          applyCallbacks({
            name: 'afterRead',
            params: record,
            dataProvider,
            handlers,
            resource,
          }),
        ),
      );

      return result;
    },

    getOne: async function <RecordType extends RsRecord = any>(
      resource: string,
      params: GetOneParams<RecordType>,
    ) {
      let newParams = params;

      newParams = await applyCallbacks({
        name: 'beforeGetOne',
        params: newParams,
        dataProvider,
        handlers,
        resource,
      });

      let result = await dataProvider.getOne<RecordType>(resource, newParams);

      result = await applyCallbacks({
        name: 'afterGetOne',
        params: result,
        dataProvider,
        handlers,
        resource,
      });

      result.data = await applyCallbacks({
        name: 'afterRead',
        params: result.data,
        dataProvider,
        handlers,
        resource,
      });

      return result;
    },

    getMany: async function <RecordType extends RsRecord = any>(
      resource: string,
      params: GetManyParams,
    ) {
      let newParams = params;

      newParams = await applyCallbacks({
        name: 'beforeGetMany',
        params: newParams,
        dataProvider,
        handlers,
        resource,
      });

      let result = await dataProvider.getMany<RecordType>(resource, newParams);

      result = await applyCallbacks({
        name: 'afterGetMany',
        params: result,
        dataProvider,
        handlers,
        resource,
      });

      result.data = await Promise.all(
        result.data.map(record =>
          applyCallbacks({
            name: 'afterRead',
            params: record,
            dataProvider,
            handlers,
            resource,
          }),
        ),
      );

      return result;
    },

    getManyReference: async function <RecordType extends RsRecord = any>(
      resource: string,
      params: GetManyReferenceParams,
    ) {
      let newParams = params;

      newParams = await applyCallbacks({
        name: 'beforeGetManyReference',
        params: newParams,
        dataProvider,
        handlers,
        resource,
      });

      let result = await dataProvider.getManyReference<RecordType>(resource, newParams);

      result = await applyCallbacks({
        name: 'afterGetManyReference',
        params: result,
        dataProvider,
        handlers,
        resource,
      });

      result.data = await Promise.all(
        result.data.map(record =>
          applyCallbacks({
            name: 'afterRead',
            params: record,
            dataProvider,
            handlers,
            resource,
          }),
        ),
      );

      return result;
    },

    update: async function <RecordType extends RsRecord = any>(
      resource: string,
      params: UpdateParams<RecordType>,
    ) {
      let newParams = params;

      newParams = await applyCallbacks({
        name: 'beforeUpdate',
        params: newParams,
        dataProvider,
        handlers,
        resource,
      });

      newParams.data = await applyCallbacks({
        name: 'beforeSave',
        params: newParams.data,
        dataProvider,
        handlers,
        resource,
      });

      let result = await dataProvider.update<RecordType>(resource, newParams);

      result = await applyCallbacks({
        name: 'afterUpdate',
        params: result,
        dataProvider,
        handlers,
        resource,
      });

      result.data = await applyCallbacks({
        name: 'afterSave',
        params: result.data,
        dataProvider,
        handlers,
        resource,
      });

      return result;
    },

    create: async function <RecordType extends RsRecord = any>(
      resource: string,
      params: CreateParams<RecordType>,
    ) {
      let newParams = params;

      newParams = await applyCallbacks({
        name: 'beforeCreate',
        params: newParams,
        dataProvider,
        handlers,
        resource,
      });
      newParams.data = await applyCallbacks({
        name: 'beforeSave',
        params: newParams.data,
        dataProvider,
        handlers,
        resource,
      });

      let result = await dataProvider.create<RecordType>(resource, newParams);

      result = await applyCallbacks({
        name: 'afterCreate',
        params: result,
        dataProvider,
        handlers,
        resource,
      });
      result.data = await applyCallbacks({
        name: 'afterSave',
        params: result.data,
        dataProvider,
        handlers,
        resource,
      });

      return result;
    },

    delete: async function <RecordType extends RsRecord = any>(
      resource: string,
      params: DeleteParams<RecordType>,
    ) {
      let newParams = params;

      newParams = await applyCallbacks({
        name: 'beforeDelete',
        params: newParams,
        dataProvider,
        handlers,
        resource,
      });

      let result = await dataProvider.delete<RecordType>(resource, newParams);

      result = await applyCallbacks({
        name: 'afterDelete',
        params: result,
        dataProvider,
        handlers,
        resource,
      });

      return result;
    },

    updateMany: async function <RecordType extends RsRecord = any>(
      resource: string,
      params: UpdateManyParams<RecordType>,
    ) {
      let newParams = params;

      newParams = await applyCallbacks({
        name: 'beforeUpdateMany',
        params: newParams,
        dataProvider,
        handlers,
        resource,
      });

      newParams.data = await applyCallbacks({
        name: 'beforeSave',
        params: newParams.data,
        dataProvider,
        handlers,
        resource,
      });

      let result = await dataProvider.updateMany<RecordType>(resource, newParams);

      result = await applyCallbacks({
        name: 'afterUpdateMany',
        params: result,
        dataProvider,
        handlers,
        resource,
      });

      const afterSaveHandlers = handlers.filter(
        handler => (handler.resource === resource || handler.resource === '*') && handler.afterSave,
      );

      if (afterSaveHandlers.length > 0) {
        const { data: records } = await dataProvider.getMany(resource, {
          ids: result.data as Identifier[],
        });
        await Promise.all(
          records.map(record =>
            applyCallbacks({
              name: 'afterSave',
              params: record,
              dataProvider,
              handlers,
              resource,
            }),
          ),
        );
      }

      return result;
    },

    deleteMany: async function <RecordType extends RsRecord = any>(
      resource: string,
      params: DeleteManyParams<RecordType>,
    ) {
      let newParams = params;

      newParams = await applyCallbacks({
        name: 'beforeDeleteMany',
        params: newParams,
        dataProvider,
        handlers,
        resource,
      });

      let result = await dataProvider.deleteMany<RecordType>(resource, newParams);

      result = await applyCallbacks({
        name: 'afterDeleteMany',
        params: result,
        dataProvider,
        handlers,
        resource,
      });

      return result;
    },
  };
};

const applyCallbacks = async function <U>({
  name,
  params,
  dataProvider,
  handlers,
  resource,
}: {
  name: string;
  params: U;
  dataProvider: DataProvider;
  handlers: ResourceCallbacks[];
  resource: string;
}): Promise<U> {
  let newParams = params;
  const handlersToApply = handlers.filter(
    (handler: any) => (handler.resource === resource || handler.resource === '*') && handler[name],
  );
  for (const handler of handlersToApply) {
    // @ts-ignore No index signature with a parameter of type 'string' was found on type
    const callbacksValue: ResourceCallbacksValue<any> = handler[name];
    if (Array.isArray(callbacksValue)) {
      for (const callback of callbacksValue ?? []) {
        newParams = await callback(newParams, dataProvider, resource);
      }
    } else {
      newParams = await callbacksValue(newParams, dataProvider, resource);
    }
  }
  return newParams;
};

type ResourceCallback<U> = {
  (params: U, dataProvider: DataProvider, resource: string): Promise<U>;
};

type ResourceCallbacksValue<V> = ResourceCallback<V> | ResourceCallback<V>[];

type ResourceCallbacks<T extends RsRecord = any> = {
  resource: string;
  afterCreate?: ResourceCallbacksValue<CreateResult<T>>;
  afterDelete?: ResourceCallbacksValue<DeleteResult<T>>;
  afterDeleteMany?: ResourceCallbacksValue<DeleteManyResult<T>>;
  afterGetList?: ResourceCallbacksValue<GetListResult<T>>;
  afterGetMany?: ResourceCallbacksValue<GetManyResult<T>>;
  afterGetManyReference?: ResourceCallbacksValue<GetManyReferenceResult<T>>;
  afterGetOne?: ResourceCallbacksValue<GetOneResult<T>>;
  afterUpdate?: ResourceCallbacksValue<UpdateResult<T>>;
  afterUpdateMany?: ResourceCallbacksValue<UpdateManyResult<T>>;
  beforeCreate?: ResourceCallbacksValue<CreateParams<T>>;
  beforeDelete?: ResourceCallbacksValue<DeleteParams<T>>;
  beforeDeleteMany?: ResourceCallbacksValue<DeleteManyParams<T>>;
  beforeGetList?: ResourceCallbacksValue<GetListParams>;
  beforeGetMany?: ResourceCallbacksValue<GetManyParams>;
  beforeGetManyReference?: ResourceCallbacksValue<GetManyReferenceParams>;
  beforeGetOne?: ResourceCallbacksValue<GetOneParams<T>>;
  beforeUpdate?: ResourceCallbacksValue<UpdateParams<T>>;
  beforeUpdateMany?: ResourceCallbacksValue<UpdateManyParams<T>>;
  beforeSave?: ResourceCallbacksValue<Partial<T>>;
  afterRead?: ResourceCallbacksValue<T>;
  afterSave?: ResourceCallbacksValue<T>;
};
