import lodashMemoize from 'lodash/memoize';
import { ValidationErrorMessage } from './types';

type Memoize = <T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: any[]) => any,
) => T;

interface MessageFuncParams {
  args: any;
  value: any;
  values: any;
}

type MessageFunc = (params: MessageFuncParams) => ValidationErrorMessage;

const memoize: Memoize = (fn: any) => lodashMemoize(fn, (...args) => JSON.stringify(args));

const getMessage = (message: string | MessageFunc, messageArgs: any, value: any, values: any) =>
  typeof message === 'function'
    ? message({
        args: messageArgs,
        value,
        values,
      })
    : messageArgs
      ? {
          message,
          args: messageArgs,
        }
      : message;

const isEmpty = (value: any) =>
  typeof value === 'undefined' ||
  value === null ||
  value === '' ||
  (Array.isArray(value) && value.length === 0);

export const required = memoize((message = 'rs.validation.required') =>
  Object.assign(
    (value: any, values: any) =>
      isEmpty(value) ? getMessage(message, undefined, value, values) : undefined,
    { isRequired: true },
  ),
);

export const minLength = memoize(
  (min, message = 'rs.validation.minLength') =>
    (value: any, values: any) =>
      !isEmpty(value) && value.length < min
        ? getMessage(message, { min }, value, values)
        : undefined,
);

export const maxLength = memoize(
  (max, message = 'rs.validation.maxLength') =>
    (value: any, values: any) =>
      !isEmpty(value) && value.length > max
        ? getMessage(message, { max }, value, values)
        : undefined,
);

export const minValue = memoize(
  (min, message = 'rs.validation.minValue') =>
    (value: any, values: any) =>
      !isEmpty(value) && value < min ? getMessage(message, { min }, value, values) : undefined,
);

export const maxValue = memoize(
  (max, message = 'rs.validation.maxValue') =>
    (value: any, values: any) =>
      !isEmpty(value) && value > max ? getMessage(message, { max }, value, values) : undefined,
);

export const number = memoize(
  (message = 'rs.validation.number') =>
    (value: any, values: any) =>
      !isEmpty(value) && isNaN(Number(value))
        ? getMessage(message, undefined, value, values)
        : undefined,
);

export const regex = lodashMemoize(
  (pattern, message = 'rs.validation.regex') =>
    (value: any, values?: any) =>
      !isEmpty(value) && typeof value === 'string' && !pattern.test(value)
        ? getMessage(message, { pattern }, value, values)
        : undefined,
  (pattern, message) => {
    return pattern.toString() + message;
  },
);

const EMAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const email = memoize((message = 'rs.validation.email') => regex(EMAIL_REGEX, message));
