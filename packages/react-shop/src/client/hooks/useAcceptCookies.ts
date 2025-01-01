import { useEffect, useState } from 'react';
import { setCookies } from '@lib/cookies';
import { COOKIE_ACCEPT_NAME } from 'src/constants';

export const useAcceptCookies = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(true);

  useEffect(() => {
    const cookiesAccepted = window.__REACT_SHOP__?.isCookieAccepted;
    if (window.__REACT_SHOP__ && !cookiesAccepted) {
      setAcceptedCookies(false);
    }
  }, []);

  const acceptCookies = (value: boolean) => {
    setAcceptedCookies(true);
    setCookies({ name: COOKIE_ACCEPT_NAME, value });
  };

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  };
};
