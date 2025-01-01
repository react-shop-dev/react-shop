import { useCallback } from 'react';
import { useBasepath } from '../router/useBasepath';
import { removeDoubleSlashes } from '@lib/removeDoubleSlashes';
import { useRedirect } from '../router';
import { afterLoginPathnameState, authPopupState, useAtomValue, useSetAtom } from '../state';
import { useAuthConfig } from './useAuthConfig';
import { useAuthProvider } from './useAuthProvider';
import { useNotificationContext } from '../notification';

export const useSignIn = (provider?: string) => {
  const basepath = useBasepath();
  const authConfig = useAuthConfig();
  const setOpen = useSetAtom(authPopupState);
  const { login: loginAuth } = useAuthProvider();
  const afterLoginPathname = useAtomValue(afterLoginPathnameState);
  const redirect = useRedirect();
  const { resetNotifications } = useNotificationContext();

  const afterLoginUrl = removeDoubleSlashes(
    `${basepath}/${afterLoginPathname || authConfig?.afterLoginUrl}`,
  );

  const login = useCallback(
    (params: any = {}) =>
      loginAuth({ provider, ...params }).then((result: any) => {
        resetNotifications();

        // Check - when receive message, display on ui, and do not close dialog or redirect
        if (result?.message) {
          return result;
        }
        setOpen(false);
        redirect({ to: afterLoginUrl, type: 'replace' });
      }),
    [resetNotifications, provider, redirect],
  );

  return login;
};
