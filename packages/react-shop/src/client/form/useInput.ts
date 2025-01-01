import { ReactElement, useId } from 'react';
import {
  useController,
  ControllerFieldState,
  UseControllerProps,
  UseFormStateReturn,
  ControllerRenderProps,
} from 'react-hook-form';
import get from 'lodash/get';
import { useRecordContext } from '../core/useRecordContext';
import { useEvent } from '../hooks/useEvent';
import { Validator } from './validators/types';
import { composeValidators, isRequired } from './validators/utils';
import { useApplyInputDefaultValues } from './useApplyInputDefaultValues';

export const useInput = <ValueType = any>(props: InputProps<ValueType>): UseInputValue => {
  const {
    id,
    name,
    source,
    validate,
    defaultValue,
    format = defaultFormat,
    parse = defaultParse,
    onBlur: initialOnBlur,
    onChange: initialOnChange,
    isRequired: isRequiredOption,
    ...options
  } = props;

  const finalName = name || source;
  const record = useRecordContext();
  const defaultId = useId();

  const sanitizedValidate = Array.isArray(validate) ? composeValidators(...validate) : validate;

  const {
    field: controllerField,
    fieldState,
    formState,
  } = useController({
    name: finalName,
    defaultValue: get(record, source, defaultValue),
    rules: {
      validate: async (value, values) => {
        if (!sanitizedValidate) return true;
        const error = await sanitizedValidate(value, values, props);
        if (!error) return true;
        return `@@react-shop@@${JSON.stringify(error)}`;
      },
    },
    ...options,
  });

  useApplyInputDefaultValues({ inputProps: props });

  const onBlur = useEvent((...event: any[]) => {
    controllerField.onBlur();
    if (initialOnBlur) {
      initialOnBlur(...event);
    }
  });

  const onChange = useEvent((...event: any[]) => {
    const eventOrValue =
      props.type === 'checkbox' && event[0]?.target?.value === 'on'
        ? event[0]?.target.checked
        : event[0]?.target?.value ?? event[0];

    controllerField.onChange(parse ? parse(eventOrValue) : eventOrValue);

    if (initialOnChange) {
      initialOnChange(...event);
    }
  });

  const field = {
    ...controllerField,
    value: format ? format(controllerField.value) : controllerField.value,
    onBlur,
    onChange,
  };

  return {
    id: id || defaultId,
    field,
    fieldState,
    formState,
    isRequired: isRequiredOption || isRequired(validate),
  };
};

const defaultFormat = (value: any) => (value == null ? '' : value);
const defaultParse = (value: string) => (value === '' ? null : value);

export type InputProps<ValueType = any> = Omit<
  UseControllerProps,
  'name' | 'defaultValue' | 'rules'
> & {
  name?: string;
  resource?: string;
  source: string;
  type?: string;
  id?: string;
  validate?: Validator | Validator[];
  label?: string | ReactElement | false;
  helperText?: string | ReactElement | false;
  defaultValue?: any;
  readOnly?: boolean;
  isRequired?: boolean;
  format?: (value: ValueType) => any;
  onBlur?: (...event: any[]) => void;
  onChange?: (...event: any[]) => void;
  parse?: (value: any) => ValueType;
};

export type UseInputValue = {
  id: string;
  isRequired: boolean;
  field: ControllerRenderProps;
  formState: UseFormStateReturn<Record<string, string>>;
  fieldState: ControllerFieldState;
};
