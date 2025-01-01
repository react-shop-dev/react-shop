import { useIntlContext } from './useIntlContext';

export const useLocale = () => {
  return useIntlContext()?.locale;
};
