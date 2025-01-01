import type { LazyImageProps } from 'react-shop';
import { Carousel } from 'react-shop-mui/Carousel';
import { fetchList } from '@/lib/data/fetch';
import type { Slide } from '@/types';

let addBluredDataUrls: (images?: LazyImageProps[]) => Promise<LazyImageProps[]>;

export default async function HomeCarousel() {
  // There is an issue with `plaiceholder` package in turbo mode
  if (!process.env.TURBOPACK) {
    addBluredDataUrls = await import('@/lib/utils/getBlurPlaceholder').then(
      module => module.default,
    );
  }

  const { data } = await fetchList<Slide>('slides');
  const slides = !process.env.TURBOPACK ? await addBluredDataUrls(data) : data;

  return <Carousel images={slides} />;
}
