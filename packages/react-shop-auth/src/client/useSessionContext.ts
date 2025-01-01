import { useContext } from 'react';
import { SessionContext, SessionContextValue } from 'next-auth/react';

export const useSessionContext = () => {
  if (!SessionContext) {
    throw new Error('React Context is unavailable in Server Components');
  }

  // @ts-expect-error SessionContextValue
  const context: SessionContextValue = useContext(SessionContext);

  if (!context && process.env.NODE_ENV !== 'production') {
    throw new Error('[next-auth]: `useSession` must be wrapped in a <SessionProvider />');
  }

  return context;
};
