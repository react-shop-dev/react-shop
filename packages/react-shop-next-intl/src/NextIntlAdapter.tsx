'use client';
import type { ReactNode } from 'react';
import { useTransition, useMemo } from 'react';
import {
  IntlErrorCode,
  IntlError,
  createTranslator,
  AbstractIntlMessages,
  Formats,
} from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';

export interface NextIntlAdapterProps<TContextProps = any> {
  defaultLocale: string;
  locale: string;
  messages: AbstractIntlMessages;
  children: (props: TContextProps) => ReactNode;
  availableLocales?: string[];
  formats?: Partial<Formats>;
}

export const NextIntlAdapter = (props: NextIntlAdapterProps) => {
  const { locale, messages, formats, children } = props;

  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const changeLocale = (locale: string): void => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  const translator = useMemo(
    () => createTranslator({ locale, messages, getMessageFallback, onError, formats }),
    [locale, messages],
  );

  const translate = (key: string, options: any) =>
    options ? translator.rich(key, options) : translator(key);

  return <>{children({ t: translate, changeLocale, isPending })}</>;
};

function getMessageFallback({
  namespace,
  key,
  error,
}: {
  error: IntlError;
  key: string;
  namespace?: string;
}) {
  const path = [namespace, key].filter(part => part != null).join('.');

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return '';
  } else {
    return `Please fix this message: ${path}`;
  }
}

function onError(error: IntlError) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    console.warn(error);
  }
}
