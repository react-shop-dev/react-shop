import type { ReactNode } from 'react';
import { GetListProviderContext } from './context/GetListProviderContext';
import {
  InfiniteListControllerProps,
  useInifinityListController,
} from '../controller/useInfinityListController';
import { InfinitePaginationContext } from './context/InfinityPaginationContext';

export const InfiniteListProvider = ({
  children,
  ...props
}: { children: ReactNode } & InfiniteListControllerProps) => {
  const controllerProps = useInifinityListController(props);

  return (
    <GetListProviderContext value={controllerProps}>
      <InfinitePaginationContext.Provider
        value={{
          hasNextPage: controllerProps.hasNextPage || false,
          fetchNextPage: controllerProps.fetchNextPage,
          isFetchingNextPage: controllerProps.isFetchingNextPage,
          hasPreviousPage: controllerProps.hasPreviousPage || false,
          fetchPreviousPage: controllerProps.fetchPreviousPage,
          isFetchingPreviousPage: controllerProps.isFetchingPreviousPage,
        }}
      >
        {children}
      </InfinitePaginationContext.Provider>
    </GetListProviderContext>
  );
};
