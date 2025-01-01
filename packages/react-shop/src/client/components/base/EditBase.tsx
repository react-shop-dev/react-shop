import type { ReactNode } from 'react';
import type { RsRecord } from 'react-shop-types';
import { type EditControllerProps, useEditController } from '@data/controller';
import { EditContextProvider } from '@data/mutate';

export const EditBase = <RecordType extends RsRecord = any, ErrorType = Error>({
  children,
  ...props
}: EditBaseProps<RecordType, ErrorType>) => {
  const controllerProps = useEditController<RecordType, ErrorType>(props);

  return <EditContextProvider value={controllerProps}>{children}</EditContextProvider>;
};

export type EditBaseProps<
  RecordType extends RsRecord = RsRecord,
  ErrorType = Error,
> = EditControllerProps<RecordType, ErrorType> & {
  children: ReactNode;
};
