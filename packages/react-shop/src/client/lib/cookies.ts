import cookies, { CookieParseOptions, CookieSerializeOptions } from 'cookie';
import { isBrowser } from '@functions/isBrowser';

const DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;

const EXPIRES = new Date(Date.now() + DAY_IN_MILISECONDS * 365);

export interface SetCookieProps {
  name: string;
  value: any;
  options?: CookieSerializeOptions;
}

export function setCookies({ name = '', value, options }: SetCookieProps) {
  document.cookie = cookies.serialize(name, value, { expires: EXPIRES, ...options });
}

export function parseCookie(name: string, options?: CookieParseOptions) {
  if (!isBrowser()) return;
  const cookieStore = cookies.parse(document.cookie, options);
  return cookieStore[name];
}

export function destroyCookie(name: string) {
  setCookies({ name, value: '', options: { maxAge: -1 } });
}
