import { atom } from './atom';
import { isBrowser } from '@functions/isBrowser';
import { safeJSONParse } from '@functions/saveJSONParse';

type Unsubscribe = () => void;

type Subscribe<Value> = (
  key: string,
  callback: (value: Value) => void,
  initialValue: Value,
) => Unsubscribe;

type StringSubscribe = (key: string, callback: (value: string | null) => void) => Unsubscribe;

type SyncStorage<Value> = {
  getItem: (key: string, initialValue: Value) => Value;
  setItem: (key: string, newValue: Value) => void;
  subscribe?: Subscribe<Value>;
};

const localStorage = isBrowser() ? window.localStorage : undefined;

function createLocalStorage<Value>() {
  let lastStr: string | null = null;
  let lastValue: Value;

  const storage: SyncStorage<Value> = {
    getItem: (key, initialValue) => {
      const valueFromStorage = localStorage?.getItem(key) ?? null;

      if (lastStr !== valueFromStorage) {
        lastValue = safeJSONParse(valueFromStorage, initialValue);
        lastStr = valueFromStorage;
      }

      return lastValue;
    },
    setItem: (key, newValue) => localStorage?.setItem(key, JSON.stringify(newValue)),
  };

  const createHandleSubscribe =
    (subscriber: StringSubscribe): Subscribe<Value> =>
    (key, callback, initialValue) =>
      subscriber(key, v => {
        const newValue = safeJSONParse(v, initialValue);
        callback(newValue);
      });

  let subscriber: StringSubscribe | undefined;

  if (!subscriber && isBrowser() && window.Storage) {
    subscriber = (key, callback) => {
      const storageEventCallback = (e: StorageEvent) => {
        if (!(localStorage instanceof window.Storage)) {
          return () => {};
        }
        if (e.storageArea === localStorage && e.key === key) {
          callback(e.newValue);
        }
      };
      window.addEventListener('storage', storageEventCallback);
      return () => {
        window.removeEventListener('storage', storageEventCallback);
      };
    };
  }
  if (subscriber) {
    storage.subscribe = createHandleSubscribe(subscriber);
  }
  return storage;
}

const defaultStorage = createLocalStorage();

export function atomWithStorage<Value>(
  key: string,
  initialValue: Value,
  storage: SyncStorage<Value> = defaultStorage as SyncStorage<Value>,
) {
  const baseAtom = atom<Value>(storage.getItem(key, initialValue));

  return {
    get: baseAtom.get,
    set: (newValue: Value) => {
      baseAtom.set(newValue);
      storage.setItem(key, newValue);
    },
    subscribe: (callback: (newValue: Value) => void) => {
      const unsubscribeAtom = baseAtom.subscribe(callback);
      let unsubscribeStorage: Unsubscribe | undefined;
      if (storage.subscribe) {
        unsubscribeStorage = storage.subscribe(
          key,
          newValue => {
            baseAtom.set(newValue);
          },
          initialValue,
        );
      }
      return () => {
        unsubscribeAtom();
        if (unsubscribeStorage) {
          unsubscribeStorage();
        }
      };
    },
  };
}
