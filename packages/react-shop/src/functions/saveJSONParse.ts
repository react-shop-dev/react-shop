export const safeJSONParse = <T = any>(value: any, defaultValue?: T) => {
  try {
    if (typeof value === 'object' && value !== null) {
      return value;
    }
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return defaultValue;
  } catch (error) {
    if (!defaultValue) {
      console.error('Error parsing JSON:', error);
    }
    return defaultValue ?? { error };
  }
};
