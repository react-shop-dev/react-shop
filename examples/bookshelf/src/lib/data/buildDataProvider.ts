import { combineDataProviders } from 'react-shop/functions';
import { STORAGE_USER_PREFIX } from '../constants';
import fakeDataProvider from './fakeDataProvider';
import { unstorageDataProvider } from './unstorageDataProvider';

export const buildDataProvider = () => {
  const dataProvider = combineDataProviders(resource => {
    switch (resource) {
      case STORAGE_USER_PREFIX:
        return unstorageDataProvider;
      default:
        return fakeDataProvider;
    }
  });
  return dataProvider;
};
