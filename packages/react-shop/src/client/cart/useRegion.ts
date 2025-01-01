import { useParams } from 'next/navigation';
import { Region } from 'react-shop-types';
import { DEFAULT_REGION } from 'src/constants';
import { useShopConfig } from '../shop';

const regionMap = new Map<string, Region>();

export const useRegion = (): Region => {
  const config = useShopConfig();
  const countryCode = useParams().locale as string;

  if (!countryCode) {
    return DEFAULT_REGION;
  }

  if (regionMap.has(countryCode)) {
    return regionMap.get(countryCode)!;
  }

  config?.regions?.forEach(region => {
    region.countries?.forEach(c => {
      regionMap.set(c.iso_2, region);
    });
  });

  return regionMap.get(countryCode) ?? DEFAULT_REGION;
};
