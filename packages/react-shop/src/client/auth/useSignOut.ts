import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useRedirect } from '../router';
import { afterLoginPathnameState, useSetAtom } from '../state';
import { useAuthConfig } from './useAuthConfig';
import { useAuthProvider } from './useAuthProvider';
import { useNotificationContext, useNotify } from '../notification';

export const useSignOut = () => {
  const authConfig = useAuthConfig();
  const router = useRouter();
  const redirect = useRedirect();
  const pathname = usePathname();
  const [isPending, setPending] = useState(false);
  const setAfterLoginPathname = useSetAtom(afterLoginPathnameState);

  const queryClient = useQueryClient();
  const { resetNotifications } = useNotificationContext();
  const notify = useNotify();
  const { logout: logoutAuth } = useAuthProvider();

  const logout = useCallback(
    (redirectTo?: string | false) => {
      setPending(true);
      return logoutAuth(redirectTo ? { callbackUrl: redirectTo } : {})
        .then(() => {
          resetNotifications();
          queryClient.clear();
          if (redirectTo === false) {
            return;
          }
          if (
            !redirectTo &&
            authConfig?.accountUrl &&
            !pathname.startsWith(authConfig?.accountUrl)
          ) {
            // If current page is not private, do not redirect
            router.refresh();
            return;
          }
          if (redirectTo?.startsWith('http') || redirectTo?.startsWith('https')) {
            window.location.href = redirectTo;
            return redirectTo;
          }
          redirect({
            to: `${redirectTo || '/'}`,
            type: 'replace',
          });

          if (pathname !== authConfig?.afterLoginUrl) {
            setAfterLoginPathname(pathname);
          }
        })
        .catch(error => {
          notify(error.message, { type: 'error' });
        })
        .finally(() => {
          setPending(false);
        });
    },
    [pathname],
  );

  return { logout, isPending };
};
