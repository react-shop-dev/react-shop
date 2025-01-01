import { Children, Fragment } from 'react';
import Script from 'next/script';
import defaultMessages from 'react-shop-english';
import { RootLayout } from './RootLayout';
import Welcome from './Welcome';
import serialize from 'serialize-javascript';
import { shopInit } from './shopInit';
import { fetchSession } from './session';
import { resolveConfig } from 'src/config/resolveConfig';
import type { ShopProps } from 'src/types/lib';
import { DEFAULT_DIR, DEFAULT_LOCALE } from 'src/constants';

export const Shop = async (props: ShopProps) => {
  const { className, meta, dir = DEFAULT_DIR, getMessages, regions, children } = props;
  const config = resolveConfig();

  const {
    cookies,
    headers: { ip, host, defaultLocale, locales },
    version,
  } = await shopInit();

  const { locale = defaultLocale, sessionID, isCookieAccepted } = cookies;
  const sessionResult = config?.session?.api
    ? await fetchSession(`${config.session.api}`, sessionID)
    : null;

  const appLocale = locale || DEFAULT_LOCALE.split('-')[0];
  const messages = getMessages ? await getMessages(appLocale) : defaultMessages;

  const isSetup = Children.count(children) === 0;
  const availableLocales = typeof locales === 'string' ? locales.split(',') : undefined;

  const globalConfig = {
    version,
    isCookieAccepted,
    config: {
      ip,
      host,
      regions,
      ...config,
    },
    session: {
      sessionID,
      sessionResult,
    },
    translate: {
      defaultLocale,
      locale,
      messages: JSON.stringify(messages),
      availableLocales,
    },
  };

  (globalThis as any).__REACT_SHOP__ = globalConfig;

  const renderWelcomeScreen = () => <Welcome />;

  const renderCoreApp = () => <Fragment>{children}</Fragment>;

  return (
    <RootLayout locale={appLocale} dir={dir} className={className} meta={meta}>
      {isSetup ? renderWelcomeScreen() : renderCoreApp()}
      <Script
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.__REACT_SHOP__ = window.__REACT_SHOP__ || {}
            window.__REACT_SHOP__ = ${serialize(globalConfig)}
          `,
        }}
      />
    </RootLayout>
  );
};
