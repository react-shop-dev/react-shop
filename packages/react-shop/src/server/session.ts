import { cookies } from 'next/headers';
import { SESSION_KEY } from '../constants';

export async function fetchSession(url?: string, sessionId?: string) {
  if (!url || !sessionId) return {};
  try {
    // no-store similar to getServerSideProps
    const sessionResponse = await fetch(`${url}/${sessionId}`, { cache: 'no-store' });

    if (sessionResponse.ok) {
      return await sessionResponse.json();
    } else if (sessionResponse.status === 404) {
      await removeSessionIdCookie();
    } else {
      return null;
    }
  } catch (error) {
    console.log('error', error);
  }
}

const removeSessionIdCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
};
