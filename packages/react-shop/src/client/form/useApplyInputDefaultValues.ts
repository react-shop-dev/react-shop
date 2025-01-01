import { useEffect } from 'react';
import get from 'lodash/get';
import { useFormContext, UseFieldArrayReturn, FieldValues } from 'react-hook-form';
import { InputProps } from './useInput';
import { useRecordContext } from '../core/useRecordContext';

interface StandartInput {
  inputProps: Partial<InputProps> & { source: string };
  isArrayInput?: undefined;
  fieldArrayInputControl?: undefined;
}

interface ArrayInput {
  inputProps: Partial<InputProps> & { source: string };
  isArrayInput: true;
  fieldArrayInputControl: UseFieldArrayReturn<FieldValues, string, 'id'>;
}

type Props = StandartInput | ArrayInput;

/*
 * This hook updates the input with the default value if default value is present
 * and field input is not already populated or dirty
 */
export const useApplyInputDefaultValues = ({
  inputProps,
  isArrayInput,
  fieldArrayInputControl,
}: Props) => {
  const { getValues, resetField, getFieldState, formState, reset } = useFormContext();
  const { defaultValue, source } = inputProps;
  const record = useRecordContext(inputProps);

  const recordValue = get(record, source);
  const { isDirty } = getFieldState(source, formState);
  const formValue = get(getValues(), source);

  useEffect(() => {
    if (defaultValue == null || formValue != null || recordValue != null || isDirty) {
      return;
    }

    const pathContainsIndex = source.split('.').some(pathPart => numericRegex.test(pathPart));

    if (pathContainsIndex) {
      const parentPath = source.split('.').slice(0, -1).join('.');
      const parentValue = get(getValues(), parentPath);
      if (parentValue == null) {
        return;
      }
    }

    if (isArrayInput) {
      if (!fieldArrayInputControl) {
        throw new Error(
          'useApplyInputDefaultValues: No fieldArrayInputControl passed in props for array input usage',
        );
      }
      fieldArrayInputControl?.replace(defaultValue);
      reset({}, { keepValues: true });
      return;
    }

    resetField(source, { defaultValue });
  });
};

const numericRegex = /^\d+$/;
