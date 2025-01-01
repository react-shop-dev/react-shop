import { Head } from './Head';
import { isBrowser } from '@functions/isBrowser';
import { useLocale } from '../i18n/useLocale';

export const MetaTags = () => {
  const locale = useLocale();
  const mode = isBrowser() && localStorage.getItem('shop-color-mode');

  return (
    <Head>
      <meta name="theme-color" content={mode === 'dark' ? 'black' : 'white'} />
      {locale ? <meta key="og:locale" name="locale" property="og:locale" content={locale} /> : null}
    </Head>
  );
};
