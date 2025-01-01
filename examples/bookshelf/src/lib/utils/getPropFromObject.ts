export function getPropFromObject<T, K extends keyof T>(
  object: T,
  path: K[] | string,
  defaultValue?: any,
): T[K] | any {
  const keys = Array.isArray(path) ? path : (path.split('.') as (keyof T)[]);

  return keys.reduce((currentObj, key) => {
    return currentObj && currentObj[key] !== undefined ? currentObj[key] : defaultValue;
  }, object);
}
