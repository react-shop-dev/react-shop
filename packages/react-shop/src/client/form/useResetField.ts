import { useCallback } from 'react';
import { useFormContext, UseFormResetField, FieldValues } from 'react-hook-form';

export const useResetField = (): UseFormResetField<FieldValues> => {
  const { resetField } = useFormContext();

  return useCallback(
    (source, params) => {
      resetField(source, params);
    },
    [resetField],
  );
};
