import type { ReactNode } from 'react';
import { CreateControllerProps, useCreateController } from '@data/controller/useCreateController';
import { CreateContextProvider } from '@data/mutate/CreateContextProvider';

export const CreateBase = ({
  children,
  ...props
}: CreateControllerProps & { children: ReactNode }) => {
  const controllerProps = useCreateController(props);

  return <CreateContextProvider value={controllerProps}>{children}</CreateContextProvider>;
};
