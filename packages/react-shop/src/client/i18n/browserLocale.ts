import { isBrowser } from '@functions/isBrowser';
import { DEFAULT_LOCALE } from 'src/constants';

interface LanguageSupport extends NavigatorLanguage {
  browserLanguage?: string;
  userLanguage?: string;
}

const getBrowserLocale = (defaultLocale?: string) => {
  const { language, browserLanguage, userLanguage } = window.navigator as LanguageSupport;
  return language || browserLanguage || userLanguage || defaultLocale || DEFAULT_LOCALE;
};

// https://zzz.buzz/2016/01/13/detect-browser-language-in-javascript/
export const resolveBrowserLocale = (
  defaultLocale?: string,
  options?: { fullLocale?: boolean },
): string => {
  if (!isBrowser()) {
    return options?.fullLocale ? DEFAULT_LOCALE : DEFAULT_LOCALE.split('-')[0];
  }
  const locale = getBrowserLocale(defaultLocale);
  return options?.fullLocale ? locale : locale.split('-')[0];
};
