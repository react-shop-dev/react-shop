import { useState, Fragment, type ReactNode, type JSX } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';
import type { EmotionCache, Options as OptionsOfCreateCache } from '@emotion/cache';

export type EmotionCacheProviderProps = {
  options: Omit<OptionsOfCreateCache, 'insertionPoint'> & { enableCssLayer?: boolean };
  CacheProvider?: (props: { value: EmotionCache; children: ReactNode }) => JSX.Element | null;
  children: ReactNode;
};

export const EmotionCacheProvider = (props: EmotionCacheProviderProps) => {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [registry] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: { name: string; isGlobal: boolean }[] = [];
    cache.insert = (...args) => {
      if (options?.enableCssLayer) {
        args[1].styles = `@layer mui {${args[1].styles}}`;
      }
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: !selector,
        });
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInsert = inserted;
      inserted = [];
      return prevInsert;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const inserted = registry.flush();
    if (inserted.length === 0) {
      return null;
    }
    let styles = '';
    let dataEmotionAttribute = registry.cache.key;

    const globals: {
      name: string;
      style: string;
    }[] = [];

    inserted.forEach(({ name, isGlobal }) => {
      const style = registry.cache.inserted[name] as string;
      if (typeof style !== 'boolean') {
        if (isGlobal) {
          globals.push({ name, style });
        } else {
          styles += style;
          dataEmotionAttribute += ` ${name}`;
        }
      }
    });

    return (
      <Fragment>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            nonce={options?.nonce}
            data-emotion={`${registry.cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles ? (
          <style
            nonce={options?.nonce}
            data-emotion={dataEmotionAttribute}
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        ) : null}
      </Fragment>
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
};
