import type { ReactNode } from 'react';
import type { Identifier } from 'react-shop-types';
import { ShowContext } from './ShowContext';
import { ShowControllerProps, useShowController } from '../controller/useShowController';
import { RecordContextProvider } from '@core/RecordContextProvider';

export interface GetOneContextProviderProps extends ShowControllerProps {
  id: Identifier;
  children: ReactNode;
}

export const GetOneContextProvider = ({ children, ...props }: GetOneContextProviderProps) => {
  const controllerProps = useShowController(props);

  return (
    <ShowContext.Provider value={controllerProps}>
      <RecordContextProvider value={controllerProps && controllerProps.record}>
        {children}
      </RecordContextProvider>
    </ShowContext.Provider>
  );
};
