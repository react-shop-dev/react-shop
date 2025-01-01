export const sanitizeValues = (values: any, record: any = {}): any => {
  const sanitizedValues: { [key: string]: any } = {};

  Object.keys(values).forEach(key => {
    if (values[key] == null || values[key] === '') {
      if (Object.prototype.hasOwnProperty.call(record, key)) {
        // use has emptied a field, make the value null
        sanitizedValues[key] = null;
      }
    } else {
      sanitizedValues[key] = values[key];
    }
  });
};
