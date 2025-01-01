import type { ReactNode } from 'react';
import { useListController, ListControllerProps } from '../controller/useListController';
import { GetListProviderContext } from './context/GetListProviderContext';

export const GetListProvider = ({
  children,
  ...props
}: { children: ReactNode } & ListControllerProps) => {
  const value = useListController(props);

  return <GetListProviderContext value={value}>{children}</GetListProviderContext>;
};
