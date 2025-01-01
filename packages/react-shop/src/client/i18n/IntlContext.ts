import { createContext } from 'react';
import get from 'lodash/get';
import messages from 'react-shop-english';
import { resolveBrowserLocale } from './browserLocale';
import { substituteTokens } from './substititeTokens';

export interface IntlContextProps {
  isPending?: boolean;
  locale: string;
  defaultLocale?: string;
  changeLocale?: (locale: string) => Promise<void> | void;
  availableLocales?: string[];
  t: (key: string, options?: any) => string;
}

export const defaultIntlContext = {
  changeLocale: (_locale: string) => Promise.resolve(),
  locale: resolveBrowserLocale(),
  t: (key: string, options?: any) => {
    const message = get(messages, key) as string;
    return substituteTokens(message, options);
  },
};

export const IntlContext = createContext<IntlContextProps>(defaultIntlContext);

IntlContext.displayName = 'IntlContext';
