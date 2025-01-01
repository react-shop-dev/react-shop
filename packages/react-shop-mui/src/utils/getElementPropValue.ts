import type { ReactElement } from 'react';
import get from 'lodash/get';

export const getElementPropValue = (element?: ReactElement, key = ''): any => {
  if (!element) return undefined;

  const propValue = get(element, `props.${key}`);

  if (propValue != undefined) {
    return propValue;
  }

  const payloadValue = get(element, '_payload.value');
  if (typeof payloadValue === 'string') {
    try {
      const parsedPayload = JSON.parse(payloadValue);
      const lastItem = parsedPayload[parsedPayload.length - 1];
      return lastItem && lastItem[key];
    } catch (error) {
      console.error('Error parsing payload:', error);
    }
  }

  return undefined;
};
