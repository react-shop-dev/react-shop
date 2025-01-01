import { useCallback } from 'react';
import { useIntlContext } from './useIntlContext';

export const useTranslate = () => {
  const intlProvider = useIntlContext();

  return useCallback(
    (key: string, { _: fallback, ...options }: any = {}) => {
      const translate = intlProvider.t(key, options);
      return translate || fallback || key;
    },
    [intlProvider],
  );
};
