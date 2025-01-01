import { DataProvider } from '@type/data';
import { defaultDataProvider } from './defaultDataProvider';

export type DataProviderMatcher = (resource: string) => DataProvider;

export const combineDataProviders = (dataProviderMatcher: DataProviderMatcher) =>
  new Proxy(defaultDataProvider, {
    get: (_target, name) => {
      if (name === 'then') {
        return null;
      }
      return (resource: string, ...params: any) => {
        if (typeof name === 'symbol') {
          return;
        }
        return dataProviderMatcher(resource)[name](resource, ...params);
      };
    },
  });
