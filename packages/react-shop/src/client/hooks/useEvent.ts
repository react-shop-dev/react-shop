import { useCallback, useLayoutEffect, useEffect, useRef } from 'react';
import { isBrowser } from '@functions/isBrowser';

const useEnhancedEffect = isBrowser() ? useLayoutEffect : useEffect;

// Alternative to useCallback that doesn't update the callback when dependencies change
export const useEvent = <Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): ((...args: Args) => Return) => {
  const ref = useRef<(...args: Args) => Return>(() => {
    throw new Error('Cannot call an event handler while rendering');
  });

  useEnhancedEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: Args) => ref.current(...args), []);
};
