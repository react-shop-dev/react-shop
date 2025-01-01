import Image, { ImageProps } from 'next/image';

// https://github.com/vercel/next.js/issues/52216
export const NextImage = (props: ImageProps) => {
  let ResolvedImage = Image;

  if ('default' in ResolvedImage) {
    ResolvedImage = (ResolvedImage as unknown as { default: typeof Image }).default;
  }

  return <ResolvedImage {...props} />;
};
