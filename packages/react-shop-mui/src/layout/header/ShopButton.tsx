import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { isElement } from 'react-is';
import { usePathname } from 'next/navigation';

export const ShopButton = ({ element }: { element: ReactNode }) => {
  const [container, setContainer] = useState(() =>
    typeof document !== 'undefined' ? document.getElementById('shop-button') : null,
  );

  const pathname = usePathname();

  useEffect(() => {
    setContainer(container => {
      const isInTheDom = typeof document !== 'undefined' && document.body.contains(container);
      if (container && isInTheDom) return container;
      return typeof document !== 'undefined' ? document.getElementById('shop-button') : null;
    });
  }, [pathname]);

  if (!container) {
    return <>{null}</>;
  }

  return isElement(element) ? createPortal(element, container) : null;
};
