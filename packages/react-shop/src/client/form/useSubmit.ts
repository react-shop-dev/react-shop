import { MouseEventHandler, useCallback } from 'react';
import { useFormState, useFormContext } from 'react-hook-form';
import type { RsRecord } from 'react-shop-types';
import { setSubmissionErrors } from './validators';
import type { TransformData } from '@type/data';
import type { UseMutationOptions } from '@tanstack/react-query';

import { useSaveContext } from '@core/useSaveContext';

export interface UseSubmitProps<RecordType extends RsRecord = any, MutationOptionsError = unknown> {
  alwaysEnable?: boolean;
  disabled?: boolean;
  transform?: TransformData;
  mutationOptions?: UseMutationOptions<RecordType, MutationOptionsError>;
}

export const useSubmit = (props: UseSubmitProps = {}) => {
  const { alwaysEnable = false, disabled: disabledProp, mutationOptions, transform } = props;

  const { dirtyFields, isValidating, isSubmitting, isSubmitSuccessful, isSubmitted } =
    useFormState();
  const form = useFormContext();
  const saveContext = useSaveContext();
  const isDirty = Object.keys(dirtyFields).length > 0;

  const disabled = valueOrDefault(
    alwaysEnable === false || alwaysEnable === undefined ? undefined : !alwaysEnable,
    disabledProp || !isDirty || isValidating || isSubmitting,
  );

  const handleSubmit = useCallback(
    async (values: any) => {
      let errors;
      if (saveContext?.save) {
        errors = await saveContext.save(values, {
          ...mutationOptions,
          transform,
        });
      }
      if (errors != null) {
        setSubmissionErrors(errors, form.setError);
      }
    },
    [form.setError, saveContext, mutationOptions, transform],
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async event => {
      if (event.defaultPrevented) {
        return;
      }
      event.stopPropagation();
      await form.handleSubmit(handleSubmit)(event);
    },
    [form, handleSubmit],
  );

  return {
    isSubmitted,
    isSubmitSuccessful,
    isSubmitting,
    disabled,
    handleClickSubmit: handleClick,
  };
};

const valueOrDefault = (value: any, defaultValue: any) =>
  typeof value === 'undefined' ? defaultValue : value;
