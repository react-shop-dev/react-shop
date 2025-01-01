import { useCallback, useSyncExternalStore } from 'react';
import { Atom } from './atom';

export function useAtomValue<Value>(atom: Atom<Value>): Value {
  return useSyncExternalStore(atom.subscribe, atom.get, atom.get);
}

export function useSetAtom<Value>(atom: Atom<Value>): (newValue: Value) => void {
  return useCallback(atom.set, [atom]);
}

export function useAtom<Value>(atom: Atom<Value>): [Value, (newValue: Value) => void] {
  return [useAtomValue(atom), useSetAtom(atom)];
}
