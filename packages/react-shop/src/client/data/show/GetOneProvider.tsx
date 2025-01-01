import type { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import type { Identifier } from 'react-shop-types';
import { GetOneContextProvider } from './GetOneContextProvider';
import { HydrateOne } from './HydrateOne';
import { useProductInterface } from '@hooks/useProductInterface';

export interface GetOneProviderProps {
  id: Identifier;
  resource?: string;
  hydration?: boolean;
  children: ReactNode;
}

export const GetOneProvider = (props: GetOneProviderProps) => {
  const { resource: resourceDefault } = useProductInterface();

  const { id: propsId, resource = resourceDefault, hydration = true, children } = props;

  const params = useParams();
  const routeId = params?.id;

  const id = propsId ?? decodeURIComponent(routeId as string);

  const renderContextProvider = () => (
    <GetOneContextProvider id={id} resource={resource}>
      {children}
    </GetOneContextProvider>
  );

  return hydration ? (
    <HydrateOne id={id} resource={resource}>
      {renderContextProvider()}
    </HydrateOne>
  ) : (
    renderContextProvider()
  );
};
