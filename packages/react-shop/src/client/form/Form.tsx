import type { ReactNode } from 'react';
import type { RsRecord } from 'react-shop-types';
import { FormProvider, UseFormProps, SubmitHandler, FieldValues } from 'react-hook-form';
import { useAugmentedForm } from './useAugmentedForm';
import { useRecordContext } from '../core/useRecordContext';
import { OptionalRecordContextProvider } from '../core/OptionalRecordContextProvider';
import type { ValidateForm } from './validators';

export type FormProps = Omit<UseFormProps, 'onSubmit'> & {
  children: ReactNode;
  id?: string;
  className?: string;
  onSubmit?: SubmitHandler<FieldValues>;
  defaultValues?: any;
  validate?: ValidateForm;
  noValidate?: boolean;
  warnWhenUnsavedChanges?: boolean;
  resetAfterSubmit?: boolean;
  notifyIsInvalid?: boolean;
  record?: Partial<RsRecord>;
};

export const Form = (props: FormProps) => {
  const { children, id, className, noValidate = false } = props;

  const record = useRecordContext(props);

  const { form, formHandleSubmit } = useAugmentedForm(props);

  return (
    <OptionalRecordContextProvider value={record}>
      <FormProvider {...form}>
        <form id={id} className={className} noValidate={noValidate} onSubmit={formHandleSubmit}>
          {children}
        </form>
      </FormProvider>
    </OptionalRecordContextProvider>
  );
};
