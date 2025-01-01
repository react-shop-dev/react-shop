import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const ReviewCount = ({ element }: { element: ReactNode }) => {
  const [container, setContainer] = useState(() =>
    typeof document !== 'undefined' ? document.getElementById('reviews-count') : null,
  );

  useEffect(() => {
    setContainer(container => {
      const isInTheDom = typeof document !== 'undefined' && document.body.contains(container);
      if (container && isInTheDom) return container;
      return typeof document !== 'undefined' ? document.getElementById('reviews-count') : null;
    });
  }, []);

  if (!container) {
    return <>{null}</>;
  }

  return createPortal(<>{element}</>, container);
};
