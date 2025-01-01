import { usePathname } from 'next/navigation';
import { parseSlugifiedUrl } from '@functions/slugify';
import { useShopConfig } from '../shop';
import { getCountryCodes } from '@functions/getCountryCodes';

export type UsePathnamesResult = Array<{ last: boolean; to: string; key?: string }>;

export const usePathnames = (skipLastPath?: boolean): UsePathnamesResult => {
  const pathname = usePathname();
  const config = useShopConfig();
  const countryCodes = config?.regions?.map(getCountryCodes).flat();

  const pathnames = (pathname || '')
    .split('/')
    .filter(path => Boolean(path) && !countryCodes?.includes(path))
    .slice(0, skipLastPath ? 1 : undefined);

  return pathnames.map((key, index) => {
    const last = index === pathnames.length - 1;
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

    return { last, to, key: parseSlugifiedUrl(key) };
  });
};
