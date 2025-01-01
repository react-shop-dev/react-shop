import { useState, useEffect } from 'react';

export const useDomLoaded = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded;
};
