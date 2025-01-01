export const omit = (record: Record<string, any>, props: string[]) =>
  Object.keys(record)
    .filter(propName => !props.includes(propName))
    .reduce((acc, key) => ({ ...acc, [key]: record[key] }), {});
