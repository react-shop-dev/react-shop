import type { ComponentType, ReactNode } from 'react';
import { useMemo } from 'react';
import { IntlContext, IntlContextProps, defaultIntlContext } from './IntlContext';
import { ShopTranslateProps } from '@type/lib';
import { safeJSONParse } from '@functions/saveJSONParse';

export type IntlAdapterComponent = ComponentType<{
  children: (props: IntlContextProps) => ReactNode;
  locale: string;
  messages: string;
}>;

export interface IntlClientProviderProps extends ShopTranslateProps {
  children: ReactNode;
  IntlAdapter?: IntlAdapterComponent;
}

export const IntlClientProvider = ({
  defaultLocale,
  locale,
  messages,
  availableLocales,
  children,
  IntlAdapter,
}: IntlClientProviderProps) => {
  const contextValues = useMemo(
    () => ({
      locale,
      defaultLocale,
      availableLocales,
    }),
    [locale, defaultLocale, availableLocales],
  );

  const renderProvider = (props: { t: IntlContextProps['t'] } & Partial<IntlContextProps>) => (
    <IntlContext.Provider value={{ ...contextValues, ...props }}>{children}</IntlContext.Provider>
  );

  if (IntlAdapter) {
    return (
      <IntlAdapter locale={locale} messages={safeJSONParse(messages)}>
        {renderProvider}
      </IntlAdapter>
    );
  }

  return renderProvider(defaultIntlContext);
};
