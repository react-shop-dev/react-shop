import { withLifecycleCallbacks } from 'react-shop/functions';
import bcrypt from 'bcryptjs';
import fakeRestDataProvider from 'ra-data-fakerest';
import { IndexedDBService } from './IndexedDBService';
import generatedData from './generateData';

const indexDB = new IndexedDBService('ReactShopDB', 'cart');

/**
 * @see https://marmelab.com/react-admin/DataProviders.html
 */

const fakeDataProviderInit = fakeRestDataProvider(generatedData, true, 300);
// Since demo site does not use any database,
// here we are using IndexedDB to simulate persisted cart
const fakeDataProvider = withLifecycleCallbacks(fakeDataProviderInit, [
  {
    resource: 'session',
    beforeCreate: async result => {
      return { data: { ...result.data, id: generateSessionId() } };
    },
    afterCreate: async result => {
      await indexDB.create(result.data, true);
      return result;
    },
    afterGetOne: async result => {
      const persistData = await indexDB.read(result.data.id);
      return { data: persistData ?? result.data };
    },
    afterUpdate: async result => {
      await indexDB.create(result.data);
      return result;
    },
    afterDelete: async result => {
      await indexDB.delete(result.data.id);
      return result;
    },
  },
  {
    resource: 'customers',
    beforeUpdate: async result => {
      const { new_password, old_password: _old_password, ...data } = result.data;
      const newData = {
        ...data,
        ...(new_password ? { password: await bcrypt.hash(new_password, 10) } : {}),
      };
      return { ...result, data: newData };
    },
  },
]);

const generateSessionId = () => Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;

export default fakeDataProvider;
