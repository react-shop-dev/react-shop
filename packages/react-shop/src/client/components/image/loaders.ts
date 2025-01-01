import { ImageLoaderProps } from 'next/image';

export type ImageProvider = 'cloudinary' | 'imagekit';

// https://cloudinary.com/documentation/transformation_reference
const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = `w_${width},q_${quality}`;
  return src.replace('/upload/', `/upload/${params}/`);
};

// https://docs.imagekit.io/features/image-transformations?_gl=1*qt8zqs*_ga*MTExOTE0NDg0MS4xNzE0MTM3MzI5*_ga_WQGX7PLP73*MTcxNDEzNzMyOC4xLjEuMTcxNDEzNzMyOC42MC4wLjA.
const imageKitLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const queryParams = params.join(',');
  return `${src}?tr=${queryParams}`;
};

const IMAGE_LOADER_PROVIDER: Record<string, ({ src, width, quality }: ImageLoaderProps) => string> =
  {
    cloudinary: cloudinaryLoader,
    imagekit: imageKitLoader,
  };

export const getLoaderByProvider = (provider?: ImageProvider) =>
  provider ? IMAGE_LOADER_PROVIDER[provider] : undefined;
