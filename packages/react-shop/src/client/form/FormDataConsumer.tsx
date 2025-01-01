import type { ReactNode } from 'react';
import { useFormContext, FieldValues } from 'react-hook-form';
import get from 'lodash/get';
import { useFormValues } from './useFormValues';

const FormDataConsumerView = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>,
) => {
  const { form: _form, children, formData, source, index, ...rest } = props;

  let ret;

  if (typeof index !== 'undefined' && source) {
    const scopedFormData = get(formData, source);
    const getSource = (scopedSource: string) => `${source}.${scopedSource}}`;
    ret = children({ formData, scopedFormData, getSource, ...rest });
  } else {
    ret = children({
      formData,
      getSource: (scopedSource: string) => scopedSource,
      ...rest,
    });
  }

  return ret === undefined ? null : ret;
};

export const FormDataConsumer = <TFieldValues extends FieldValues = FieldValues>(
  props: ConnectedProps,
) => {
  const form = useFormContext<TFieldValues>();

  const {
    formState: { isDirty: _isDirty },
  } = form;

  const formData = useFormValues<TFieldValues>();

  return <FormDataConsumerView<TFieldValues> formData={formData} {...props} />;
};

interface FormDataConsumerRenderParams<
  TFieldValues extends FieldValues = FieldValues,
  TScopedFieldValues extends FieldValues = TFieldValues,
> {
  formData: TFieldValues;
  scopedFormData?: TScopedFieldValues;
  getSource: (source: string) => string;
}

type FormDataConsumerRender<TFieldValues extends FieldValues = FieldValues> = (
  params: FormDataConsumerRenderParams<TFieldValues>,
) => ReactNode;

interface ConnectedProps {
  children: FormDataConsumerRender<FieldValues>;
  form?: string;
  record?: any;
  source?: string;
  [key: string]: any;
}

interface Props<TFieldValues extends FieldValues> extends ConnectedProps {
  formData: TFieldValues;
  index?: number;
}
