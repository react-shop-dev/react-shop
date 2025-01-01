type Unsubscribe = () => void;

type Subscribe<Value> = (callback: (newValue: Value) => void) => Unsubscribe;

export type Atom<Value> = {
  get: () => Value;
  set: (newValue: Value) => void;
  subscribe: Subscribe<Value>;
  _subscribers?: () => number;
};

export function atom<Value>(initialValue: Value): Atom<Value> {
  let value = initialValue;
  const subscribers = new Set<(newValue: Value) => void>();

  return {
    get: () => value,
    set: newValue => {
      value = newValue;
      subscribers.forEach(callback => callback(value));
    },
    subscribe: callback => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
    _subscribers: () => subscribers.size,
  };
}
