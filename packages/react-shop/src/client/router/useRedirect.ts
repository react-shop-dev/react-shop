import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import queryString from 'query-string';
import NProgress from 'nprogress';
import { removeDoubleSlashes } from '@lib/removeDoubleSlashes';
import { useBasepath } from './useBasepath';

type Options = { keepQuery?: boolean; keepHash?: boolean } & NavigateOptions;

export interface UseRedirectParams {
  type?: 'replace' | 'push';
  query?: Record<string, unknown>;
  options?: Options;
  to?: string;
  hash?: string;
}

export const useRedirect = () => {
  const { push, replace } = useRouter();
  const pathname = usePathname();
  const basepath = useBasepath();
  const searchParams = useSearchParams();

  return useCallback(
    ({
      type,
      to,
      options: { keepQuery, keepHash, scroll } = {},
      query,
      hash,
    }: UseRedirectParams) => {
      let urlHash = '';
      const navigateOptions = { scroll };

      if (keepHash) {
        urlHash = document.location.hash;
      }
      if (hash) {
        urlHash = `#${hash.replace(/^#/, '')}`;
      }

      const urlQuery = {
        ...(keepQuery ? queryString.parse(searchParams.toString()) : {}),
        ...query,
      };

      if (urlQuery.to) {
        urlQuery.to = encodeURIComponent(`${urlQuery.to}`);
      }

      const hasUrlPath = urlHash.length > 1;
      const hasUrlQuery = Object.keys(urlQuery).length > 0;

      const cleanPathname = pathname?.split('?')[0].split('#')[0] ?? '';
      const urlTo = removeDoubleSlashes(to || cleanPathname);

      if (urlTo !== pathname) {
        NProgress.start();
      }

      const fullPath = `${basepath}${urlTo}${
        hasUrlQuery
          ? '?' +
            queryString.stringify(urlQuery, {
              skipNull: true,
              encode: true,
            })
          : ''
      }${hasUrlPath ? urlHash : ''}`;

      return type === 'replace'
        ? replace(fullPath, navigateOptions)
        : push(fullPath, navigateOptions);
    },
    [],
  );
};
