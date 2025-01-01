import {
  useEffect,
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from 'react';
import { isBrowser } from '@functions/isBrowser';

export const useSafeSetState = <T>(
  initialState?: T | (() => T),
): [T | undefined, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(initialState);

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetState = useCallback(
    (args: any) => {
      if (mountedRef.current) {
        return setState(args);
      }
    },
    [mountedRef, setState],
  );

  return [state, safeSetState];
};

export const useTimeout = (ms = 0, key = '') => {
  const [ready, setReady] = useSafeSetState(false);

  useEffect(() => {
    setReady(false);
    const timer = setTimeout(() => {
      setReady(true);
    }, ms);
    return () => {
      clearTimeout(timer);
    };
  }, [key, ms, setReady]);

  return ready;
};

export const useIsMounted = () => {
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};

export const useIsFirstMount = (): boolean => {
  const isFirstMount = useRef(true);
  useEffect(() => {
    isFirstMount.current = false;
  }, []);
  return isFirstMount.current;
};

export const useSafeLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
