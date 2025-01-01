import { isRtlLang } from 'rtl-detect';

export const useTextDirection = (locale: string) => (isRtlLang(locale) ? 'rtl' : 'ltr');
