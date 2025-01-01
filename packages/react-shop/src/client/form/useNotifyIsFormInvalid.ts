import { useEffect, useRef } from 'react';
import { useFormState, Control } from 'react-hook-form';
import { useNotify } from '../notification/useNotify';

export const useNotifyIsFormInvalid = (control?: Control, notifyIsInvalid = true) => {
  const { submitCount, errors } = useFormState(control ? { control } : undefined);

  const submitCountRef = useRef(submitCount);
  const notify = useNotify();

  useEffect(() => {
    if (!notifyIsInvalid) return;
    if (submitCount > submitCountRef.current) {
      submitCountRef.current = submitCount;
      if (Object.keys(errors).length > 0) {
        const serverError =
          typeof errors.root?.serverError?.message === 'string'
            ? errors.root.serverError.message
            : undefined;

        notify(serverError || 'rs.message.invalid_form', { type: 'error' });
      }
    }
  }, [submitCount, errors, notify, notifyIsInvalid]);
};
