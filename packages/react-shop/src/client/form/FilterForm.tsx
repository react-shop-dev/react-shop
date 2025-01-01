import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import unset from 'lodash/unset';
import cloneDeep from 'lodash/cloneDeep';
import { useListFilterContext } from '@data/list/context/useListFilterContext';

export type FilterFormProps = {
  defaultValues?: FieldValues;
  children: ReactNode;
};

export const FilterForm = (props: FilterFormProps) => {
  const { defaultValues, children } = props;

  const { filterValues, setFilters } = useListFilterContext();

  const form = useForm({ defaultValues: defaultValues || filterValues });

  // Reapply filterValues when the URL changes
  useEffect(() => {
    const newValues = getFilterFormValues(form.getValues(), filterValues);
    if (!isEqual(newValues, form.getValues())) {
      form.reset(newValues);
    }
  }, [filterValues, form]);

  useEffect(() => {
    const subscription = form.watch(async (values, { name = '' }) => {
      const isFormValid = await form.trigger();
      if (isFormValid) {
        if (get(values, name) === '') {
          const newValues = cloneDeep(values);
          unset(newValues, name);
          setFilters(newValues, false);
        } else {
          setFilters(values, false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, setFilters]);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormProvider>
  );
};

const handleSubmit = (event: any) => {
  event.preventDefault();
  return false;
};

export const getFilterFormValues = (
  formValues: Record<string, any>,
  filterValues: Record<string, any>,
) => {
  return Object.keys(formValues).reduce(
    (acc, key) => {
      acc[key] = getInputValue(formValues, key, filterValues);
      return acc;
    },
    cloneDeep(filterValues) ?? {},
  );
};

const getInputValue = (
  formValues: Record<string, any>,
  key: string,
  filterValues: Record<string, any>,
) => {
  if (formValues[key] === undefined || formValues[key] === null) {
    return '';
  }
  if (Array.isArray(formValues[key])) {
    return get(filterValues, key, '');
  }
  if (formValues[key] instanceof Date) {
    return get(filterValues, key, '');
  }
  if (typeof formValues[key] === 'object') {
    const inputValues = Object.keys(formValues[key]).reduce((acc: any, innerKey: string) => {
      const nestedInputValue = getInputValue(
        formValues[key],
        innerKey,
        (filterValues || {})[key] ?? {},
      );
      if (nestedInputValue === '') {
        return acc;
      }
      acc[innerKey] = nestedInputValue;
      return acc;
    }, {});
    if (!Object.keys(inputValues).length) return '';
    return inputValues;
  }
  return get(filterValues, key, '');
};
