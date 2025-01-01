const isObject = (obj: unknown) => obj && Object.prototype.toString.call(obj) === '[object Object]';

export const getValueFromStorage = (value: unknown): Record<string, any> => {
  let storedValue;
  try {
    storedValue = JSON.parse(typeof value === 'string' ? value : '');
  } catch (e) {
    storedValue = value;
  }
  return isObject(storedValue) ? storedValue : {};
};
