import type { LazyImageProps } from 'react-shop';
import { getPlaiceholder } from 'plaiceholder';

export const getBase64 = async (imageUrl: string) => {
  if (!imageUrl) return;

  try {
    const result = await fetch(imageUrl);
    if (!result.ok) {
      throw new Error(`Failed to fetch image: ${result.status} ${result.statusText}`);
    }
    const buffer = await result.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
    if (error instanceof Error) {
      console.warn('error', error.message);
    }
  }
};

const addBluredDataUrls = async (images: LazyImageProps[] = []) => {
  const base64Promises = images.map(image => getBase64(image.src as string));
  const base64Results = await Promise.all(base64Promises);

  return images.map((image, index) => ({
    ...image,
    blurDataURL: base64Results[index],
    priority: true,
    sizes: '(max-width: 768px) 100vw, 1000px',
  }));
};

export default addBluredDataUrls;
