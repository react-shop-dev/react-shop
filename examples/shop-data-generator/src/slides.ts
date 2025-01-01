import type { Identifier } from 'react-shop-types';
import { STORAGE_IMAGE_FORMAT, STORAGE_URL } from './constants';

const SLIDES_COUNT = 3;

export const generateSlides = (): Slide[] =>
  [...Array(SLIDES_COUNT)].map((_, index) => ({
    id: `slide_${index + 1}`,
    src: `${STORAGE_URL}/slide${index + 1}.${STORAGE_IMAGE_FORMAT}`,
  }));

export type Slide = {
  id: Identifier;
  src: string;
};
