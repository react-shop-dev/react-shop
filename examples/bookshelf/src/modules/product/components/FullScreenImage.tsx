'use client';

import { MuiLazyImage, type MuiLazyImageProps } from 'react-shop-mui/MuiLazyImage';
import { parseSlugifiedUrl } from 'react-shop/functions';
import { THUMBNAIL_FORMAT, STORAGE_URL } from '@/lib/constants';

export const FullScreenImage = ({
  format = THUMBNAIL_FORMAT,
  fileName,
  ...rest
}: Omit<MuiLazyImageProps, 'src'> & {
  format?: string;
  fileName: string;
}) => (
  <MuiLazyImage
    {...rest}
    sizes="500px"
    src={`${STORAGE_URL}/assets/${fileName}.${format}`}
    alt={parseSlugifiedUrl(fileName, '_')}
  />
);
