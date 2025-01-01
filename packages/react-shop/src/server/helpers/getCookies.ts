import { cookies } from 'next/headers';
import { COOKIE_ACCEPT_NAME, LOCALE_COOKIE, SESSION_KEY } from '../../constants';

export type GetCookieResult = {
  sessionID?: string;
  locale?: string;
  isCookieAccepted?: string;
};

export async function getCookies(): Promise<GetCookieResult> {
  const cookieStore = await cookies();

  const sessionID = cookieStore.get(SESSION_KEY)?.value;
  const isCookieAccepted = cookieStore.get(COOKIE_ACCEPT_NAME)?.value;
  const locale = cookieStore.get(LOCALE_COOKIE)?.value;

  return {
    sessionID,
    locale,
    isCookieAccepted,
  };
}
