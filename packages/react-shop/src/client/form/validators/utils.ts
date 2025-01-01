import { FieldValues, UseFormSetError } from 'react-hook-form';
import { ValidationErrorMessageWithArgs, Validator } from './types';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import isObject from 'lodash/isObject';

export type ValidateForm = (data: FieldValues) => FieldValues | Promise<FieldValues>;

export const setSubmissionErrors = (
  errors: FieldValues,
  setError: UseFormSetError<FieldValues>,
) => {
  const setErrorFromObject = (errors: FieldValues, rootPath: string) => {
    Object.entries(errors).forEach(([name, error]) => {
      if (typeof error === 'object') {
        setErrorFromObject(error, `${rootPath}${name}.`);
        return;
      }
      setError(`${rootPath}${name}`, {
        type: 'server',
        message: error.toString(),
      });
    });
  };
  setErrorFromObject(errors, '');
};

// Compose multiple validators into a single one for use with react-hook-form
export const composeValidators = (...validators: Validator[]) => {
  const allValidators = (Array.isArray(validators[0]) ? validators[0] : validators).filter(
    isFunction,
  ) as Validator[];
  return allValidators.reduce(combine2Validators, () => null);
};

export const composeSyncValidators =
  (...validators: Validator[]) =>
  (value: any, values: FieldValues, meta: any) => {
    const allValidators = (Array.isArray(validators[0]) ? validators[0] : validators).filter(
      isFunction,
    );

    for (const validator of allValidators) {
      const error = validator(value, values, meta);
      if (error) {
        return error;
      }
    }
  };

const isFunction = (value: unknown) => typeof value === 'function';

export const combine2Validators = (validator1: Validator, validator2: Validator): Validator => {
  return (value, values, meta) => {
    const result1 = validator1(value, values, meta);
    if (!result1) {
      return validator2(value, values, meta);
    }
    if (typeof result1 === 'string' || isValidationErrorMessageWithArgs(result1)) {
      return result1;
    }

    return result1.then(resolvedResult1 => {
      if (!resolvedResult1) {
        return validator2(value, values, meta);
      }
      return resolvedResult1;
    });
  };
};

function isValidationErrorMessageWithArgs(
  error: ReturnType<Validator>,
): error is ValidationErrorMessageWithArgs {
  return error ? Object.prototype.hasOwnProperty.call(error, 'message') : false;
}

export const getSimpleValidationResolver =
  (validate: ValidateForm) => async (data: FieldValues) => {
    const errors = await validate(data);

    if (!errors || Object.getOwnPropertyNames(errors).length === 0) {
      return { values: data, errors: {} };
    }

    const flattenedErrors = flattenErrors(errors);

    return {
      values: {},
      errors: Object.keys(flattenedErrors).reduce(
        (acc, field) => ({
          ...acc,
          [field]: {
            type: 'manual',
            message: flattenedErrors[field],
          },
        }),
        {} as FieldValues,
      ),
    };
  };

export const flattenErrors = (
  obj: Record<string, any>,
  path: string[] = [],
): Record<string, any> => {
  return !isObject(obj)
    ? { [path.join('.')]: obj }
    : reduce(
        obj,
        (result, value, key) => {
          if (
            (obj[key] as ValidationErrorMessageWithArgs).message !== null &&
            (obj[key] as ValidationErrorMessageWithArgs).args !== null
          ) {
            return merge(result, { [key]: obj[key] });
          }

          return merge(result, flattenErrors(value, [...path, key]));
        },
        {},
      );
};

export const isRequired = (validate: any) => {
  if (validate && validate.isRequired) {
    return true;
  }
  if (Array.isArray(validate)) {
    return !!validate.find(it => it.isRequired);
  }
  return false;
};
