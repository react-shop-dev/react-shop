/**
 * ======== CREDIT: React Admin ==========
 * https://github.com/marmelab/react-admin/blob/master/packages/ra-core/src/dataProvider/useDataProvider.ts
 */
import { useContext, useMemo } from 'react';
import { DataProviderContext } from './DataProviderContext';
import { defaultDataProvider } from '../../functions/defaultDataProvider';
import { DataProvider } from 'src/types/data';
import { dataFetchActions } from './dataFetchActions';
import { validateResponseFormat } from './validateResponseFormat';

export const useDataProvider = <
  TDataProvider extends DataProvider = DataProvider,
>(): TDataProvider => {
  const dataProvider = (useContext(DataProviderContext) ||
    defaultDataProvider) as unknown as TDataProvider;

  const dataProviderProxy = useMemo(() => {
    return new Proxy(dataProvider, {
      get: (_target, name) => {
        if (typeof name === 'symbol' || name === 'then') {
          return;
        }
        return async (...args: any) => {
          const type = name.toString();

          if (typeof dataProvider[type] !== 'function') {
            throw new Error(`Unknown dataProvider function: ${type}`);
          }

          try {
            const response = await dataProvider[type](...args);

            if (process.env.NODE_ENV !== 'production' && dataFetchActions.includes(type)) {
              validateResponseFormat(response, type);
            }

            return response;
          } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
              console.error(error);
            }
            throw new Error(
              'The dataProvider threw an error. It should return a rejected Promise instead',
            );
          }
        };
      },
    });
  }, [dataProvider]);

  return dataProviderProxy;
};
