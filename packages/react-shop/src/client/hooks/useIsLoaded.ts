import { useEffect, useState } from 'react';

export const useIsLoaded = (isLoading?: boolean): boolean => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setLoaded(true);
    }
  }, [isLoading]);

  return loaded;
};
