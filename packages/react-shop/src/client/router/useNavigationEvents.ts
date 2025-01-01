import { useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSafeLayoutEffect } from '../hooks';

export const useNavigationEvent = (onPathnameChange: (url: string) => void) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = `${pathname}?${searchParams}`;
  const savedPathNameRef = useRef(url);

  useSafeLayoutEffect(() => {
    if (savedPathNameRef.current !== url) {
      onPathnameChange(url);
      savedPathNameRef.current = url;
    }
  }, [url, onPathnameChange]);
};
