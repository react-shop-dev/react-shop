import { ReactElement, Children, useEffect, cloneElement } from 'react';
import { useFormContext, useFieldArray, UseFieldArrayReturn, FieldError } from 'react-hook-form';
import { ArrayInputContext } from './ArrayInputContext';
import type { RsRecord } from 'react-shop-types';
import type { InputProps } from '../useInput';
import { composeSyncValidators, isRequired } from '../validators';
import { useGetValidationErrorMessage } from '../validators/useGetValidationErrorMessage';
import { useApplyInputDefaultValues } from '../useApplyInputDefaultValues';

export const ArrayInput = (props: ArrayInputProps) => {
  const { source, record, validate, resource, children } = props;

  const { register, unregister, getValues, getFieldState, formState } = useFormContext();

  const sanitizedValidate = Array.isArray(validate) ? composeSyncValidators(...validate) : validate;

  const getValidationErrorMessage = useGetValidationErrorMessage();

  const fieldProps = useFieldArray({
    name: source,
    rules: {
      validate: async value => {
        if (!sanitizedValidate) return true;
        const error = await sanitizedValidate(value, getValues, props);

        if (!error) return true;
        return getValidationErrorMessage(error);
      },
    },
  });

  useEffect(() => {
    register(source);
    return () => {
      unregister(source, { keepValue: true, keepError: true, keepDirty: true, keepTouched: true });
    };
  }, [register, unregister, source]);

  useApplyInputDefaultValues({
    inputProps: props,
    isArrayInput: true,
    fieldArrayInputControl: fieldProps,
  });

  const { isDirty, error } = getFieldState(source, formState);

  return (
    <ArrayInputContext.Provider value={fieldProps}>
      {cloneElement(Children.only(children), {
        ...fieldProps,
        record,
        source,
        resource,
        isDirty,
        error,
        isRequired: isRequired(validate),
      })}
    </ArrayInputContext.Provider>
  );
};

export interface ArrayInputChildProps extends Partial<UseFieldArrayReturn> {
  record: Partial<RsRecord>;
  source: string;
  resource: string;
  isRequired: boolean;
  isDirty: boolean;
  error: FieldError;
}

export interface ArrayInputProps extends InputProps {
  children: ReactElement;
  record?: Partial<RsRecord>;
}
