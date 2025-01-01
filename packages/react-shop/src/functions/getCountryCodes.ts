import type { Region } from 'react-shop-types';

export const getCountryCodes = (region: Region) => region.countries?.map(country => country.iso_2);
