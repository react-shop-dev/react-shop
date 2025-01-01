import { BaseSyntheticEvent, useCallback, useRef, useMemo } from 'react';
import merge from 'lodash/merge';
import { useForm, UseFormProps, SubmitHandler, FieldValues } from 'react-hook-form';
import { sanitizeValues } from './sanitizeEmptyValues';
import { useNotifyIsFormInvalid } from './useNotifyIsFormInvalid';
import { useUnsavedChangeNotifier } from './useUnsavedChangeNotifier';
import { useRecordContext } from '../core/useRecordContext';
import { ValidateForm, getSimpleValidationResolver, setSubmissionErrors } from './validators/utils';
import { useSaveContext } from '@core/useSaveContext';

export const useAugmentedForm = (props: UseAugmentedForm) => {
  const {
    onSubmit,
    defaultValues,
    mode = 'onChange',
    criteriaMode = 'firstError',
    reValidateMode = 'onChange',
    sanitizeEmptyValues,
    validate,
    resolver,
    resetAfterSubmit,
    notifyIsInvalid = true,
    warnWhenUnsavedChanges = false,
    ...rest
  } = props;

  const record = useRecordContext(props);
  const saveContext = useSaveContext();

  const defaultValuesIncludingRecord = useMemo(
    () => merge({}, defaultValues, record),
    [defaultValues, record],
  );

  const finalResolver = resolver
    ? resolver
    : validate
      ? getSimpleValidationResolver(validate)
      : undefined;

  const form = useForm({
    criteriaMode,
    values: defaultValuesIncludingRecord,
    reValidateMode,
    resolver: finalResolver,
    mode,
    ...rest,
  });

  const formRef = useRef(form);

  useNotifyIsFormInvalid(form.control, notifyIsInvalid);

  useUnsavedChangeNotifier(warnWhenUnsavedChanges, form.control);

  const handleSubmit = useCallback(
    async (values: any, event?: BaseSyntheticEvent) => {
      let errors;
      const finalValues = sanitizeEmptyValues ? sanitizeValues(values, record) : values;
      if (onSubmit) {
        errors = await onSubmit(finalValues, event && event);
      }
      if (onSubmit == null && saveContext?.save) {
        errors = await saveContext.save(finalValues);
      }
      if (errors != null) {
        setSubmissionErrors(errors, formRef.current.setError);
      }
      !errors && resetAfterSubmit && formRef.current.reset();
    },
    [onSubmit, record, saveContext, sanitizeEmptyValues, resetAfterSubmit],
  );

  const formHandleSubmit = useCallback(
    (event: BaseSyntheticEvent) => {
      if (!event.defaultPrevented) {
        event.stopPropagation();
        form.handleSubmit(handleSubmit)(event);
      }
    },
    [form, handleSubmit],
  );

  return {
    form,
    handleSubmit,
    formHandleSubmit,
  };
};

export interface UseAugmentedForm extends Omit<UseFormProps, 'onSubmit'> {
  validate?: ValidateForm;
  defaultValues?: any;
  sanitizeEmptyValues?: boolean;
  notifyIsInvalid?: boolean;
  resetAfterSubmit?: boolean;
  onSubmit?: SubmitHandler<FieldValues>;
  warnWhenUnsavedChanges?: boolean;
}
