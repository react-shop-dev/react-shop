import { useCallback } from 'react';
import { Atom, atom } from './atom';

type AtomWithReset<Value> = Atom<Value> & { reset: () => void };

export function atomWithReset<Value>(initialValue: Value): AtomWithReset<Value> {
  const baseAtom = atom(initialValue);

  return {
    ...baseAtom,
    reset: () => baseAtom.set(initialValue),
  };
}

export function useResetAtom<Value>(atom: AtomWithReset<Value>): () => void {
  return useCallback(() => {
    if ('reset' in atom) {
      atom.reset();
    } else {
      throw new Error("Provided atom does not support 'reset'");
    }
  }, [atom]);
}
